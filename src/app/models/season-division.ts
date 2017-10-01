export interface SeasonDivision {
  id: number;
  type: string;
  attributes: SeasonDivisionAttributes;
  relationships: SeasonDivisionRelationship;
}

export interface SeasonDivisionAttributes {
  position: number;
}

export interface SeasonDivisionRelationship {
  division: RelationshipLinks;
  teams: RelationshipLinks;
  season: RelationshipLinks;
}

export interface RelationshipLinks {
  self: string;
  related: string;
}
