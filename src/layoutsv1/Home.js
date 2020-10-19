import React from 'react';

import {useQuery} from 'urql';

import {
	Container,
  Row,
  Col,
} from "react-bootstrap";
import StatCard from '../components/StatCard';

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
	return <Row>
		<Col md={3}>
			<StatCard stat={totalValue} title="Total People" icon=""/>
		</Col>
		<Col md={3}>
			<StatCard stat={lastWeekValue} title="Joined this week" icon=""/>
		</Col>
		<Col md={3}>
				<StatCard stat={last_week_trans.results[0].value} title='Transactions this week' />
		</Col>
	</Row>;
}

export default function Home(props) {
	return <Container spacing={2}>
		<PeopleStats />
	</Container>;
};
