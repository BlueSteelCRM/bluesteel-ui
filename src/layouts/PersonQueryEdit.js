import React from 'react';
import Paper from '@material-ui/core/Paper';
import SaveableForm from '../components/SaveableForm';
import AppBar from '@material-ui/core/AppBar';
//import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {Query, Builder, BasicConfig, Utils as QbUtils} from 'react-awesome-query-builder';

//import "antd/dist/antd.css";
import 'react-awesome-query-builder/css/antd.less';
import 'react-awesome-query-builder/css/styles.scss';
import 'react-awesome-query-builder/css/compact_styles.scss'; //optional, for more compact styles






function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value} style={{"padding":"10px"}}>{children}</Paper>
}

const config = {
  ...BasicConfig,
  fields: {
    qty: {
        label: 'Qty',
        type: 'number',
        fieldSettings: {
            min: 0,
        },
        valueSources: ['value'],
        preferWidgets: ['number'],
    },
    price: {
        label: 'Price',
        type: 'number',
        valueSources: ['value'],
        fieldSettings: {
            min: 10,
            max: 100,
        },
        preferWidgets: ['slider', 'rangeslider'],
    },
    color: {
        label: 'Color',
        type: 'select',
        valueSources: ['value'],
        listValues: [
          { value: 'yellow', title: 'Yellow' },
          { value: 'green', title: 'Green' },
          { value: 'orange', title: 'Orange' }
        ],
    },
    is_promotion: {
        label: 'Promo?',
        type: 'boolean',
        operators: ['equal'],
        valueSources: ['value'],
    },
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = {"id": QbUtils.uuid(), "type": "group"};

class DemoQueryBuilder extends React.Component {
    state = {
      tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
      config: config
    };

    render = () => (
      <div>
        <Query
            {...config}
            value={this.state.tree}
            onChange={this.onChange}
            renderBuilder={this.renderBuilder}
        />
        {this.renderResult(this.state)}
      </div>
    )

    renderBuilder = (props) => (
      <div className="query-builder-container" style={{padding: '10px'}}>
        <div className="query-builder qb-lite">
            <Builder {...props} />
        </div>
      </div>
    )

    renderResult = ({tree: immutableTree, config}) => (
      <div className="query-builder-result">
          <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre></div>
          <div>MongoDb query: <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre></div>
          <div>SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre></div>
          <div>JsonLogic: <pre>{JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}</pre></div>
      </div>
    )

    onChange = (immutableTree, config) => {
      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      this.setState({tree: immutableTree, config: config});

      const jsonTree = QbUtils.getTree(immutableTree);
      console.log(jsonTree);
      // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    }
}


export default function PersonEdit(props){
	let {classes}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	return	<div className={classes.contentWrapper}>
		<Paper className={classes.paper}>
			<AppBar position="static">
			<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
				<Tab label="Overview" id="tab-overview"/>
				<Tab label="Edit" id="tab-contact"/>
			</Tabs>
			</AppBar>
			<TabPanel value={tabIndex} index={0} classes={classes}>
					<SaveableForm {...props}/>
			</TabPanel>
			<TabPanel value={tabIndex} index={1} classes={classes}>
				<DemoQueryBuilder/>
			</TabPanel>
			</Paper>
		</div>;
}
