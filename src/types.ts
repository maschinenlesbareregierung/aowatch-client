export type MetaApiVersion = "2.0";
export type MetaStatus = "error" | "ok";

export type MetaResult = {
    count: number
    total: number
    range_start: number
    range_end: number
}

export type MetaResultEntity = {
    entity_id: string
    entity_type: string
}

export type ResponseMeta = {
    abgeordnetenwatch_api: {
        version: MetaApiVersion
        documentation: string
    }
    status: MetaStatus
    status_message: string
    result: MetaResult | MetaResultEntity
}

export type ResponseEntityMeta = {
    abgeordnetenwatch_api: {
        version: MetaApiVersion
        documentation: string
    }
    status: MetaStatus
    status_message: string
    result: MetaResultEntity
}

export type EntityRelatedData = {
    legislatures?: any
    elections?: any
    all_parliament_periods?: EntityRelatedData
}

export type operator = "eq" | "gt" | "gte" | "lt" | "lte" | "ne" | "sw" | "cn" | "ew";

export type EntityParliament = {
    id: number
    entity_type: string
    label: string
    api_url: string
    abgeordnetenwatch_url: string
    label_external_long: string
    current_project: EntityParliamentPeriod
    related_data?: any
}

export type EntityParliamentPeriod = {
    [x: string]: any
}

