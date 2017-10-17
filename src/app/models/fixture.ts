import { Team } from '../models/team';
import { Division } from '../models/division';
import { Season } from '../models/season';

export interface Fixture {
  id: string;
  type: string;
  attributes: FixtureAttributes;
}

export interface FixtureAttributes {
  season: Season;
  fixtureDate: string;
  division: Division;
  homeTeam: Team;
  awayTeam: Team;
  homeGoals: number;
  awayGoals: number;
}

export interface FixtureDate {
  fixtureDate: string;
  fixtures: Fixture[];
}
