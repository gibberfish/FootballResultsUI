export interface Season {
  id: number;
  type: string;
  attributes: SeasonAttributes;
  relationships: SeasonRelationship;
}

export interface SeasonAttributes {
  seasonNumber: number;
}

export interface SeasonRelationship {
  seasonDivisions: SeasonDivisionRelationship;
}

export interface SeasonDivisionRelationship {
  links: SeasonDivisionRelationshipLinks;
}

export interface SeasonDivisionRelationshipLinks {
  self: string;
  related: string;
}