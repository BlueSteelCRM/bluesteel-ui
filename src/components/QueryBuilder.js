import React from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//import {SchemaContext} from '../SchemaContext';
import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../theme/Styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';


import "./queryStyles.css";


function RenderItem({item,onRemove}){
	return <Card>
	<CardHeader title={item.label}
	action={onRemove&&
          <IconButton aria-label="remove"
					onClick={()=>onRemove()}
					>
            <CloseIcon />
          </IconButton>
        }
	/>
	<CardContent>
	Fooo
	</CardContent>
	</Card>;
}

// This method is needed for rendering clones of draggables
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  return (
		<React.Fragment>
		<ListItem
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				ref={provided.innerRef}
				style={provided.draggableProps.style}
				className={snapshot.isDragging ? "dragging" : ""}
			>
			<RenderItem item={item}/>
		</ListItem>
		</React.Fragment>
  );
};

function Copyable(props) {
  return (
    <Droppable
      renderClone={getRenderItem(props.items, props.className)}
      droppableId={props.droppableId}
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <List ref={provided.innerRef} className={props.className}>
          {props.items.map((item, index) => {
            const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={item.id}>
                {shouldRenderClone ? (
                  <ListItem className="react-beatiful-dnd-copy"><RenderItem item={item}/></ListItem>
                ) : (
                  <Draggable draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? "dragging" : ""}
                        >
                          <RenderItem item={item}/>
                        </ListItem>
                      </React.Fragment>
                    )}
                  </Draggable>
                )}
              </React.Fragment>
            );
          })}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}

function QueryOptions(props) {
  return <Copyable droppableId="QUERYOPTIONS" className="query-options" items={props.items} />;
}

function Query(props) {
  return (
    <Droppable droppableId="QUERY">
      {(provided, snapshot) => (
        <List ref={provided.innerRef} className="query-items">
					{props.items.length===0 && <div className="query-placeholder">Drop query options here</div>}
          {props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <ListItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                >
                  <RenderItem item={item} onRemove={()=>props.onRemove(item)}/>
                </ListItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}

const allQueryOptions = [
  { id: uuid(), label: "Apple", type:"foo" },
  { id: uuid(), label: "Banana",type:"bar" },
  { id: uuid(), label: "orange",type:"123" }
];

const remove = (list, index) => {
  list.splice(index, 1);
  return list;
};

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destination;
};

export default withStyles(commonStyles)(function({classes}){
	//let {queryOptions}=React.useContext(SchemaContext);
  const [queryItems, setQueryItems] = React.useState([]);
  const onDragEnd = React.useCallback(
    result => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setQueryItems(currentItems =>{
            let newItems=reorder(currentItems, source.index, destination.index)
            return JSON.parse(JSON.stringify(newItems));
          });
          break;
        case "QUERYOPTIONS":
          setQueryItems(currentItems =>{
						let newItems=copy(allQueryOptions, currentItems, source, destination);
            return JSON.parse(JSON.stringify(newItems));
					}
          );
          break;
        default:
          break;
      }
    },
    [setQueryItems]
  );

	const onRemove = React.useCallback(
    item => {
			setQueryItems(currentItems =>{
				let index=currentItems.indexOf(item);
				return JSON.parse(JSON.stringify(remove(currentItems, index)));
				}
			);
		},
		[setQueryItems]
	);

  return (
		<div className={classes.contentWrapper}>
		<Paper className={classes.paper}>
			<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
				<Toolbar>
					<Grid container spacing={2} alignItems="center">
						<Grid item>
							Query Editor
						</Grid>
						<Grid item xs>
							Current items: {queryItems.length}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
      <DragDropContext onDragEnd={onDragEnd}>
				<Grid container>
					<Grid item xs={9}>
						<Query items={queryItems} onRemove={onRemove}/>
					</Grid>

					<Grid item xs={3} className="query-options-wrapper">
		        <h2>Query Options</h2>
		        <QueryOptions items={allQueryOptions} />
					</Grid>
				</Grid>
      </DragDropContext>
		</Paper>
		</div>
  );
});
