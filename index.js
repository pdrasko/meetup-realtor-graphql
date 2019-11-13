/*
@author Drasko Profirovic

Demo GraphQL instance demonstrating how to 
evolve a schema safely and with future needs in mind.

Presented during the Realtor.com meetup on Mobile:
https://www.meetup.com/Realtor-com-Technology-meetup/events/265718915/


Slide-deck: 
http://bit.ly/meetup-realtor-graphql
*/

const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    mortgage_analysis(price: Int, down_payment: Int): MortgageAnalysis
  }

  type MortgageAnalysis {
    property_tax: Int
    home_insurance: Int
    hoa_fee: HoaFee
    mortgage_options: [Mortgage]
  }

  type Mortgage {
    rate: Float
    loan_type: LoanType
    principal_and_interest: Int
    total: Int
  }

  enum LoanType {
    thirty_year_fixed
    fifteen_year_fixed
  }

  type HoaFee {
    frequency: Frequency
    amount: Int
  }

  enum Frequency {
    weekly
    monthly
    yearly
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    mortgage_analysis: (root, args, context) => {
      return {
        property_tax: 384,
        home_insurance: 112,
        hoa_fee: {
          frequency: "monthly",
          amount: 50
        },
        mortgage_options: [
          {
            rate: 3.878,
            loan_type: "thirty_year_fixed",
            principal_and_interest: 2258,
            total: 2754
          }
        ]
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
