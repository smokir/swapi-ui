import pick from 'lodash.pick';
import omit from 'lodash.omit';

import { RESOURCE_TYPE } from './constants';
import { ResourceType, ResourceByResourceTypeMapper, Resource } from './types';

type FormatterBaseArgument<T extends ResourceType> = {
  resourceType: T;
  resource: ResourceByResourceTypeMapper[T];
};

export type FormatterArgument =
  | FormatterBaseArgument<typeof RESOURCE_TYPE.PEOPLE>
  | FormatterBaseArgument<typeof RESOURCE_TYPE.FILMS>
  | FormatterBaseArgument<typeof RESOURCE_TYPE.STARSHIPS>
  | FormatterBaseArgument<typeof RESOURCE_TYPE.VEHICLES>
  | FormatterBaseArgument<typeof RESOURCE_TYPE.SPECIES>
  | FormatterBaseArgument<typeof RESOURCE_TYPE.PLANETS>;

export const getResourceId = (resource: Resource) => {
  const match = resource.url.match(/\/(\d+)/);
  const [, id] = match!;
  return id;
};

// TODO: get resourceType from 'url'
export const formatResourceForCard = (data: FormatterArgument) => {
  const result = {
    id: getResourceId(data.resource),
    title: '',
    details: {} as Record<string, string | string[]>,
    description: '',
  };

  switch (data.resourceType) {
    case RESOURCE_TYPE.PEOPLE:
      result.title = data.resource.name;
      // TODO: make a description from known data
      // result.description = `A ${data.resource.gender} born at ${data.resource.birthYear} with ${data.resource.hairColor} hair color and ${data.resource.eyeColor}`;
      result.details = pick(data.resource, ['birthYear', 'gender', 'mass', 'height']);
      break;
    case RESOURCE_TYPE.FILMS:
      result.title = data.resource.title;
      result.description = data.resource.openingCrawl;
      break;
    case RESOURCE_TYPE.STARSHIPS:
      result.title = data.resource.name;
      result.details = pick(data.resource, [
        'model',
        'costInCredits',
        'hyperdriveRating',
        'starshipClass',
      ]);
      break;
    case RESOURCE_TYPE.VEHICLES:
      result.title = data.resource.name;
      result.details = pick(data.resource, ['model', 'costInCredits', 'vehicleClass']);
      break;
    case RESOURCE_TYPE.SPECIES:
      result.title = data.resource.name;
      result.details = pick(data.resource, ['classification', 'designation', 'language']);
      break;
    case RESOURCE_TYPE.PLANETS:
      result.title = data.resource.name;
      result.details = pick(data.resource, [
        'gravity',
        'population',
        'diameter',
        'rotationPeriod',
        'orbitalPeriod',
      ]);
      break;
  }

  return result;
};

// TODO: get resourceType from 'url'
export const formatResourceForDetails = (data: FormatterArgument) => {
  const result = {
    id: getResourceId(data.resource),
    title: '',
    details: {} as Record<string, string | string[]>,
    // TODO
    // related: [],
  };

  switch (data.resourceType) {
    case RESOURCE_TYPE.PEOPLE:
      result.title = data.resource.name;
      // TODO: make a description from known data
      // result.description = `A ${data.resource.gender} born at ${data.resource.birthYear} with ${data.resource.hairColor} hair color and ${data.resource.eyeColor}`;
      result.details = omit(data.resource, [
        'species',
        'homeworld',
        'starships',
        'vehicles',
        'films',
        'url',
      ]);
      break;
    case RESOURCE_TYPE.FILMS:
      result.title = data.resource.title;
      result.details = omit(data.resource, [
        'characters',
        'planets',
        'species',
        'starships',
        'vehicles',
        'url',
      ]);
      break;
    case RESOURCE_TYPE.STARSHIPS:
      result.title = data.resource.name;
      result.details = omit(data.resource, ['films', 'pilots', 'url']);
      break;
    case RESOURCE_TYPE.VEHICLES:
      result.title = data.resource.name;
      result.details = omit(data.resource, ['films', 'pilots', 'url']);
      break;
    case RESOURCE_TYPE.SPECIES:
      result.title = data.resource.name;
      result.details = omit(data.resource, ['films', 'people', 'url']);
      break;
    case RESOURCE_TYPE.PLANETS:
      result.title = data.resource.name;
      result.details = omit(data.resource, ['films', 'residents', 'url']);
      break;
  }

  return result;
};

export const isResourceType = (value: string): value is ResourceType => {
  return Object.values(RESOURCE_TYPE).includes(value as ResourceType);
};
