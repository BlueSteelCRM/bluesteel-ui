import React from 'react';

import {useQuery} from 'urql';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import { makeStyles } from '@material-ui/core/styles';

function PeopleStats() {
	const [{fetching,data,error}]=useQuery({
		query: `query {
			total: PersonStats(query: {
				outputs: [{
					name: "total",
					expression: "count(*)"
				}]
			}) {
				results {
					key
					value
				}
			}
			last_week: PersonStats(query: {
				outputs: [{
					name: "last_week",
					expression: "count(*)"
				}],
				conditions: [{
					expression: "created_at > date_sub(now(), interval 1 week)"
				}]
			}) {
				results {
					key
					value
				}
			}
			last_week_trans: TransactionStats(query: {
				outputs: [{
					name: "last_week_trans",
					expression: "count(*)"
				}],
				conditions: [{
					expression: "ts > date_sub(now(), interval 1 week)"
				}]
			}) {
				results {
					key
					value
				}
			}
		}`
	});
	if(fetching) return '...';
	if(error) return error.toString();
	const {total,last_week,last_week_trans}=data;
	if (!total) return "Invalid response";

	const totalValue = total.results[0].value;
	const lastWeekValue = last_week.results[0].value;
	return <React.Fragment>
		<Grid item md={3}>
			<Card>
				<CardHeader title={totalValue} subheader='Total People' />
			</Card>
		</Grid>
		<Grid item md={3}>
			<Card>
				<CardHeader title={lastWeekValue} subheader='Joined this week' />
			</Card>
		</Grid>
		<Grid item md={3}>
			<Card>
				<CardHeader title={last_week_trans.results[0].value} subheader='Transactions this week' />
			</Card>
		</Grid>
	</React.Fragment>;
}

const useHomeStyles=makeStyles({
	home: {
		margin: '3px',
	}
});

export default function Home(props) {
	const styles = useHomeStyles();
	return <Grid container spacing={2} className={styles.home}>
		<PeopleStats />
	</Grid>;
};
