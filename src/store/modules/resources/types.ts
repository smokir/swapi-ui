import { $Values } from 'utility-types';

import { RESOURCE_TYPE } from './constants';

export type ResourceType = $Values<typeof RESOURCE_TYPE>;

export interface ResourceByResourceTypeMapper {
  [RESOURCE_TYPE.PEOPLE]: Person;
  [RESOURCE_TYPE.FILMS]: Film;
  [RESOURCE_TYPE.STARSHIPS]: Starship;
  [RESOURCE_TYPE.VEHICLES]: Vehicle;
  [RESOURCE_TYPE.SPECIES]: Specie;
  [RESOURCE_TYPE.PLANETS]: Planet;
}

export interface GetResourcesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Resource[];
}

export interface FetchResourcesReturn {
  resourceType: ResourceType;
  response: GetResourcesResponse;
  page: number;
  total: number;
}

export type Resource = Person | Film | Starship | Vehicle | Specie | Planet;

export interface Person {
  // using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin
  birthYear: string;
  // Will be "unknown" if not known or "n/a" if the person does not have an eye.
  eyeColor: string;
  films: string[];
  // "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
  gender: string;
  // Will be "unknown" if not known or "n/a" if the person does not have hair.
  hairColor: string;
  height: string;
  // reference to a planet
  homeworld: string;
  mass: string;
  name: string;
  skinColor: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface Film {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  // episodeId: number;
  openingCrawl: string;
  planets: string[];
  // comma-separated string
  producer: string;
  releaseDate: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

export interface Starship {
  MGLT: string;
  cargoCapacity: string;
  consumables: string;
  costInCredits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdriveRating: string;
  length: string;
  // comma-separated string if more than one
  manufacturer: string;
  // "n/a" if this starship is incapable of atmospheric flight.
  maxAtmospheringSpeed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starshipClass: string;
  url: string;
}

export interface Vehicle {
  cargoCapacity: string;
  consumables: string;
  costInCredits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  // comma-separated string if more than one
  manufacturer: string;
  maxAtmospheringSpeed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  url: string;
  vehicleClass: string;
}

export interface Specie {
  averageHeight: string;
  averageLifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  // reference to a planet
  homeworld: string;
  language: string;
  name: string;
  people: string[];
  films: string[];
  url: string;

  // comma-separated string
  // "none" if this species does not typically have eyes
  eyeColors: string;

  // comma-separated string
  // "none" if this species does not typically have hair
  hairColors: string;

  // "none" if this species does not typically have skin
  // comma-separated string
  skinColors: string;
}

export interface Planet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbitalPeriod: string;
  population: string;
  residents: string[];
  rotationPeriod: string;
  surfaceWater: string;
  terrain: string;
  url: string;
}
