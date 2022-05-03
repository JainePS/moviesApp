// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface MovieDetail {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: BelongsToCollection;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

export interface BelongsToCollection {
    id:            number;
    name:          string;
    poster_path:   string;
    backdrop_path: string;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toMovieDetail(json: string): MovieDetail {
        return cast(JSON.parse(json), r("MovieDetail"));
    }

    public static MovieDetailToJson(value: MovieDetail): string {
        return JSON.stringify(uncast(value, r("MovieDetail")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "MovieDetail": o([
        { json: "adult", js: "adult", typ: true },
        { json: "backdrop_path", js: "backdrop_path", typ: "" },
        { json: "belongs_to_collection", js: "belongs_to_collection", typ: r("BelongsToCollection") },
        { json: "budget", js: "budget", typ: 0 },
        { json: "genres", js: "genres", typ: a(r("Genre")) },
        { json: "homepage", js: "homepage", typ: "" },
        { json: "id", js: "id", typ: 0 },
        { json: "imdb_id", js: "imdb_id", typ: "" },
        { json: "original_language", js: "original_language", typ: "" },
        { json: "original_title", js: "original_title", typ: "" },
        { json: "overview", js: "overview", typ: "" },
        { json: "popularity", js: "popularity", typ: 3.14 },
        { json: "poster_path", js: "poster_path", typ: "" },
        { json: "production_companies", js: "production_companies", typ: a(r("ProductionCompany")) },
        { json: "production_countries", js: "production_countries", typ: a(r("ProductionCountry")) },
        { json: "release_date", js: "release_date", typ: Date },
        { json: "revenue", js: "revenue", typ: 0 },
        { json: "runtime", js: "runtime", typ: 0 },
        { json: "spoken_languages", js: "spoken_languages", typ: a(r("SpokenLanguage")) },
        { json: "status", js: "status", typ: "" },
        { json: "tagline", js: "tagline", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "video", js: "video", typ: true },
        { json: "vote_average", js: "vote_average", typ: 3.14 },
        { json: "vote_count", js: "vote_count", typ: 0 },
    ], false),
    "BelongsToCollection": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "poster_path", js: "poster_path", typ: "" },
        { json: "backdrop_path", js: "backdrop_path", typ: "" },
    ], false),
    "Genre": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
    ], false),
    "ProductionCompany": o([
        { json: "id", js: "id", typ: 0 },
        { json: "logo_path", js: "logo_path", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "origin_country", js: "origin_country", typ: "" },
    ], false),
    "ProductionCountry": o([
        { json: "iso_3166_1", js: "iso_3166_1", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "SpokenLanguage": o([
        { json: "english_name", js: "english_name", typ: "" },
        { json: "iso_639_1", js: "iso_639_1", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
};
