export type metaApiVersion = "2.0";
export type metaStatus = "error" | "ok";

export type metaResult = {
    count: number
    total: number
    range_start: number
    range_end: number
}

export type metaResultEntity = {
    entity_id: number
    entity_type: string
}

export type responseMeta = {
    abgeordnetenwatch_api: {
        version: metaApiVersion
        documentation: string
    }
    status: metaStatus
    status_message: string
    result: metaResult | metaResultEntity
}

export type operator = "eq" | "gt" | "gte" | "lt" | "lte" | "ne" | "sw" | "cn" | "ew";

export type entityParliament = {
    id: number
    entity_type: string
    label: string
    api_url: string
    abgeordnetenwatch_url: string
    label_external_long: string
    current_project: entityParliamentPeriod
}

export type entityParliamentPeriod = {
    [x: string]: any
}

