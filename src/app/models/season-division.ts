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
  division: Relationship;
  teams: Relationship;
  season: Relationship;
}

export interface Relationship {
  data: RelationshipData;
  links: RelationshipLinks;
}

export interface RelationshipLinks {
  self: string;
  related: string;
}

export interface RelationshipData {
  id: string;
  type: string;
  name: string;
}