export default `
type Biomarker {
    name: String!
    abreviations: [String]
    description: String
}
type Query {
    biomarker(name: String!): Biomarker
    biomarkers: [Biomarker]
}
type Mutation {
    createBiomarker(
        name: String!, 
        description: String, 
        abreviations: [String]): Biomarker
}
`;