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


// extra parameter for a complex filter parameter value
export type FilterParameterValue = {
    [x: string]: string | number
}
// default request parameters
export type RequestParameters = {
    [x: string]: string | number | any | FilterParameterValue
}

export type PagerParameters = {
    page: number
    pager_limit: number
}

export type RangeParameters = {
    range_start: number
    range_end: number
}

export type StringSortDirection = "asc" | "desc"

export type SortParameters = {
    sort_by: string
    sort_direction: StringSortDirection
}

export type FilterParameters = {
    [x: string]: string | number
}

export type OperatorFilterParameters = {
    field: string
    operator: Operator
    value: string | number
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

export type Operator = "eq" | "gt" | "gte" | "lt" | "lte" | "ne" | "sw" | "cn" | "ew";

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
    id: number
    entity_type: string
    label: string
    api_url: string
    abgeordnetenwatch_url: string
    parliament: EntityParliament
    previous_peroid: EntityParliamentPeriod
    type: string
    election_date: string | null
    start_date_period: string
    end_date_period: string
}

