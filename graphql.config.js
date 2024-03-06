// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-flow").config();

module.exports = {
	projects: {
		app: {
			//schema: [`${process.env.APOLLO_SERVER_URL}`],
			schema: [`./schema.graphql`],
			documents: ["src/**/*.graphql"],
		},
	},
};
