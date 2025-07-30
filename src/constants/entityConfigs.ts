import type { EntityConfig } from "@/types";
import {
  createBasicField,
  createArrayField,
  createFormField,
  createFormFieldWithValidation,
} from "@/shared/lib/entity/configHelpers";

// Character configuration
const charactersConfig: EntityConfig = {
  type: "characters",
  name: "Character",
  pluralName: "Characters",
  endpoint: "/people",
  icon: "/src/assets/images/character.png",
  primaryField: "name",
  searchable: true,
  cardFields: [
    createBasicField("name", "Name"),
    createBasicField("height", "Height", "cm"),
    createBasicField("mass", "Mass", "kg"),
    createBasicField("hair_color", "Hair Color"),
    createBasicField("skin_color", "Skin Color"),
    createBasicField("eye_color", "Eye Color"),
    createBasicField("birth_year", "Birth Year"),
    createBasicField("gender", "Gender"),
  ],
  detailSections: [
    {
      title: "Basic Information",
      fields: [
        createBasicField("name", "Name"),
        createBasicField("height", "Height", "cm"),
        createBasicField("mass", "Mass", "kg"),
        createBasicField("birth_year", "Birth Year"),
        createBasicField("gender", "Gender"),
      ],
    },
    {
      title: "Appearance",
      fields: [
        createBasicField("hair_color", "Hair Color"),
        createBasicField("skin_color", "Skin Color"),
        createBasicField("eye_color", "Eye Color"),
      ],
    },
    {
      title: "Relationships",
      fields: [
        createArrayField("films", "Films"),
        createArrayField("species", "Species"),
        createArrayField("vehicles", "Vehicles"),
        createArrayField("starships", "Starships"),
      ],
    },
  ],
  formFields: [
    createFormFieldWithValidation(
      "name",
      "Name",
      "text",
      undefined,
      true,
      "Character name is required",
      {
        min: 2,
        max: 50,
        message: "Name must be between 2 and 50 characters",
      }
    ),
    createFormFieldWithValidation(
      "height",
      "Height (cm)",
      "text",
      undefined,
      true,
      'Enter height in centimeters or "unknown"',
      {
        pattern: "^(\\d+|unknown|n/a)$",
        message: 'Height must be a number, "unknown", or "n/a"',
      }
    ),
    createFormFieldWithValidation(
      "mass",
      "Mass (kg)",
      "text",
      undefined,
      true,
      'Enter mass in kilograms or "unknown"',
      {
        pattern: "^(\\d+|unknown|n/a)$",
        message: 'Mass must be a number, "unknown", or "n/a"',
      }
    ),
    createFormFieldWithValidation(
      "birth_year",
      "Birth Year",
      "text",
      undefined,
      true,
      'e.g., "19BBY", "112BBY", "unknown"',
      {
        pattern: "^(\\d+BBY|\\d+ABY|unknown|n/a)$",
        message: 'Birth year format: "19BBY", "112ABY", "unknown", or "n/a"',
      }
    ),
    createFormField(
      "gender",
      "Gender",
      "select",
      [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "hermaphrodite", label: "Hermaphrodite" },
        { value: "n/a", label: "N/A" },
        { value: "none", label: "None" },
        { value: "unknown", label: "Unknown" },
      ],
      true
    ),
    createFormFieldWithValidation(
      "hair_color",
      "Hair Color",
      "text",
      undefined,
      true,
      'Enter hair color or "unknown"',
      {
        min: 2,
        max: 30,
        message: "Hair color must be between 2 and 30 characters",
      }
    ),
    createFormFieldWithValidation(
      "skin_color",
      "Skin Color",
      "text",
      undefined,
      true,
      'Enter skin color or "unknown"',
      {
        min: 2,
        max: 30,
        message: "Skin color must be between 2 and 30 characters",
      }
    ),
    createFormFieldWithValidation(
      "eye_color",
      "Eye Color",
      "text",
      undefined,
      true,
      'Enter eye color or "unknown"',
      {
        min: 2,
        max: 30,
        message: "Eye color must be between 2 and 30 characters",
      }
    ),
  ],
};

// Film configuration
const filmsConfig: EntityConfig = {
  type: "films",
  name: "Film",
  pluralName: "Films",
  endpoint: "/films",
  icon: "/src/assets/images/film.png",
  primaryField: "title",
  searchable: true,
  cardFields: [
    createBasicField("title", "Title"),
    createBasicField("episode_id", "Episode"),
    createBasicField("director", "Director"),
    createBasicField("producer", "Producer"),
    createBasicField("release_date", "Release Date"),
  ],
  detailSections: [
    {
      title: "Film Information",
      fields: [
        createBasicField("title", "Title"),
        createBasicField("episode_id", "Episode"),
        createBasicField("director", "Director"),
        createBasicField("producer", "Producer"),
        createBasicField("release_date", "Release Date"),
      ],
    },
    {
      title: "Content",
      fields: [
        {
          key: "opening_crawl",
          label: "Opening Crawl",
          type: "text",
          format: (value: unknown) => {
            const strValue = String(value);
            return strValue?.substring(0, 100) + "..." || "No opening crawl";
          },
        },
      ],
    },
    {
      title: "Characters & Locations",
      fields: [
        createArrayField("characters", "Characters"),
        createArrayField("planets", "Planets"),
        createArrayField("starships", "Starships"),
        createArrayField("vehicles", "Vehicles"),
        createArrayField("species", "Species"),
      ],
    },
  ],
  formFields: [
    createFormField("title", "Title", "text", undefined, true),
    createFormField("episode_id", "Episode ID", "number", undefined, true),
    createFormField("director", "Director", "text", undefined, true),
    createFormField("producer", "Producer", "text", undefined, true),
    createFormField(
      "release_date",
      "Release Date",
      "text",
      undefined,
      true,
      "Format: YYYY-MM-DD"
    ),
    createFormField(
      "opening_crawl",
      "Opening Crawl",
      "textarea",
      undefined,
      false,
      "The opening crawl text"
    ),
  ],
};

// Planet configuration
const planetsConfig: EntityConfig = {
  type: "planets",
  name: "Planet",
  pluralName: "Planets",
  endpoint: "/planets",
  icon: "/src/assets/images/planet.png",
  primaryField: "name",
  searchable: true,
  cardFields: [
    createBasicField("name", "Name"),
    createBasicField("rotation_period", "Rotation Period", "hours"),
    createBasicField("orbital_period", "Orbital Period", "days"),
    createBasicField("diameter", "Diameter", "km"),
    createBasicField("climate", "Climate"),
    createBasicField("terrain", "Terrain"),
    createBasicField("population", "Population"),
  ],
  detailSections: [
    {
      title: "Physical Characteristics",
      fields: [
        createBasicField("name", "Name"),
        createBasicField("diameter", "Diameter", "km"),
        createBasicField("rotation_period", "Rotation Period", "hours"),
        createBasicField("orbital_period", "Orbital Period", "days"),
        createBasicField("gravity", "Gravity"),
        createBasicField("surface_water", "Surface Water", "%"),
      ],
    },
    {
      title: "Environment",
      fields: [
        createBasicField("climate", "Climate"),
        createBasicField("terrain", "Terrain"),
        createBasicField("population", "Population"),
      ],
    },
    {
      title: "Relationships",
      fields: [
        createArrayField("residents", "Residents"),
        createArrayField("films", "Films"),
      ],
    },
  ],
  formFields: [
    createFormField("name", "Name", "text", undefined, true),
    createFormField(
      "rotation_period",
      "Rotation Period",
      "text",
      undefined,
      true,
      'Enter in hours or "unknown"'
    ),
    createFormField(
      "orbital_period",
      "Orbital Period",
      "text",
      undefined,
      true,
      'Enter in days or "unknown"'
    ),
    createFormField(
      "diameter",
      "Diameter",
      "text",
      undefined,
      true,
      'Enter in kilometers or "unknown"'
    ),
    createFormField("climate", "Climate", "text", undefined, true),
    createFormField("gravity", "Gravity", "text", undefined, true),
    createFormField("terrain", "Terrain", "text", undefined, true),
    createFormField(
      "surface_water",
      "Surface Water",
      "text",
      undefined,
      true,
      'Enter percentage or "unknown"'
    ),
    createFormField(
      "population",
      "Population",
      "text",
      undefined,
      true,
      'Enter population number or "unknown"'
    ),
  ],
};

// Starship configuration
const starshipsConfig: EntityConfig = {
  type: "starships",
  name: "Starship",
  pluralName: "Starships",
  endpoint: "/starships",
  icon: "/src/assets/images/starship.png",
  primaryField: "name",
  searchable: true,
  cardFields: [
    createBasicField("name", "Name"),
    createBasicField("model", "Model"),
    createBasicField("manufacturer", "Manufacturer"),
    createBasicField("cost_in_credits", "Cost"),
    createBasicField("length", "Length", "m"),
    createBasicField("crew", "Crew"),
    createBasicField("passengers", "Passengers"),
  ],
  detailSections: [
    {
      title: "Specifications",
      fields: [
        createBasicField("name", "Name"),
        createBasicField("model", "Model"),
        createBasicField("manufacturer", "Manufacturer"),
        createBasicField("cost_in_credits", "Cost in Credits"),
        createBasicField("length", "Length", "m"),
        createBasicField("max_atmosphering_speed", "Max Speed"),
      ],
    },
    {
      title: "Crew & Capacity",
      fields: [
        createBasicField("crew", "Crew"),
        createBasicField("passengers", "Passengers"),
        createBasicField("cargo_capacity", "Cargo Capacity"),
        createBasicField("consumables", "Consumables"),
      ],
    },
    {
      title: "Performance",
      fields: [
        createBasicField("hyperdrive_rating", "Hyperdrive Rating"),
        createBasicField("MGLT", "MGLT"),
        createBasicField("starship_class", "Starship Class"),
      ],
    },
    {
      title: "Relationships",
      fields: [
        createArrayField("pilots", "Pilots"),
        createArrayField("films", "Films"),
      ],
    },
  ],
  formFields: [
    createFormField("name", "Name", "text", undefined, true),
    createFormField("model", "Model", "text", undefined, true),
    createFormField("manufacturer", "Manufacturer", "text", undefined, true),
    createFormField(
      "cost_in_credits",
      "Cost in Credits",
      "text",
      undefined,
      true,
      'Enter cost or "unknown"'
    ),
    createFormField(
      "length",
      "Length",
      "text",
      undefined,
      true,
      'Enter in meters or "unknown"'
    ),
    createFormField(
      "max_atmosphering_speed",
      "Max Atmosphering Speed",
      "text",
      undefined,
      true,
      'Enter speed or "n/a"'
    ),
    createFormField(
      "crew",
      "Crew",
      "text",
      undefined,
      true,
      'Enter crew size or "unknown"'
    ),
    createFormField(
      "passengers",
      "Passengers",
      "text",
      undefined,
      true,
      'Enter passenger capacity or "unknown"'
    ),
    createFormField(
      "cargo_capacity",
      "Cargo Capacity",
      "text",
      undefined,
      true,
      'Enter cargo capacity or "unknown"'
    ),
    createFormField(
      "consumables",
      "Consumables",
      "text",
      undefined,
      true,
      'e.g., "3 years", "1 month"'
    ),
    createFormField(
      "hyperdrive_rating",
      "Hyperdrive Rating",
      "text",
      undefined,
      true,
      'Enter rating or "n/a"'
    ),
    createFormField(
      "MGLT",
      "MGLT",
      "text",
      undefined,
      true,
      'Enter MGLT or "n/a"'
    ),
    createFormField(
      "starship_class",
      "Starship Class",
      "text",
      undefined,
      true
    ),
  ],
};

// Species configuration (Coming Soon)
const speciesConfig: EntityConfig = {
  type: "species",
  name: "Species",
  pluralName: "Species",
  endpoint: "/species",
  icon: "/src/assets/images/species.png",
  primaryField: "name",
  searchable: false,
  cardFields: [],
  detailSections: [],
};

// Vehicles configuration (Coming Soon)
const vehiclesConfig: EntityConfig = {
  type: "vehicles",
  name: "Vehicle",
  pluralName: "Vehicles",
  endpoint: "/vehicles",
  icon: "/src/assets/images/vehicles.png",
  primaryField: "name",
  searchable: false,
  cardFields: [],
  detailSections: [],
};

// Configuration map
const entityConfigs: Record<string, EntityConfig> = {
  characters: charactersConfig,
  films: filmsConfig,
  planets: planetsConfig,
  starships: starshipsConfig,
  species: speciesConfig,
  vehicles: vehiclesConfig,
};

// Helper function to get entity configuration
export const getEntityConfig = (entityType: string): EntityConfig => {
  return entityConfigs[entityType];
};
