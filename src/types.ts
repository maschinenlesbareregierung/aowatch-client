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

export type EntityFraction = {
    id: number
    entity_type: string
    label: string
    api_url: string
    abgeordnetenwatch_url: string
    full_name: string
    short_name: string
    legislature: string
}

export type EntityCommittee = {
    id: number
    entity_type: string
    label: string
    api_url: string
    abgeordnetenwatch_url: string
    field_legislature: EntityParliamentPeriod
    field_topics: any[]
    related_data?: any
}

export type EntityCommitteeMembership = {
    id: number
    entity_type: string
    label: string
    api_url: string
    committee: EntityCommittee
    candidacy_mandate: any
    committee_role: string
}

export type EntityConstituency = {
    id: number
    entity_type: string
    label: string
    api_url: string
    name: string
    number: number
    parliament_period: EntityParliamentPeriod
}

export type EntityCountry = {
    id: number
    entity_type: string
    label: string
    api_url: string
}

export type EntityCity = {
    id: number
    entity_type: string
    label: string
    api_url: string
}

export type EntityElectionProgram = {
    id: number
    entity_type: string
    label: string
    api_url: string
    parliament_period: EntityParliamentPeriod
    party: EntityParty
    link: any
    file: string
}

export type EntityElectoralList = {
    id: number
    entity_type: string
    label: string
    api_url: string
    name: string
    parliament_period: EntityParliamentPeriod
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
    related_data?: any
}

export type EntityPolitician = {
    id: number
    entity_type: string
    label: string
    api_url: string
    abgeordnetenwatch_url: string
    first_name: string
    last_name: string
    birth_name: string
    sex: string
    year_of_birth: number
    party: any
    party_past: string
    deceased: boolean
    deceased_date: string
    education: string
    residence: string
    occupation: string
    statistic_questions: string
    statistic_questions_answered: string
    qid_wikidata: string
    field_title: string
    related_data?: any
}

export type EntityPoll = {
    id: number
    entity_type: string
    label: string
    api_url: string
    abgeordnetenwatch_url: string
    field_committees: EntityCommittee
    field_intro: string
    field_legislature: EntityParliamentPeriod
    field_poll_date: string
    field_related_links: any[]
    field_topics: any[]
    related_data?: any
}

export type EntityVote = {
    id: number
    entity_type: string
    label: string
    api_url: string
    mandate: EntityCandidacyMandate,
    poll: EntityPoll
    vote: string
    reason_no_show: string
    reason_no_show_other: string
}

export type EntityParty = {
    id: number
    entity_type: string
    label: string
    api_url: string
    full_name: string
    related_data?: any
}

export type EntityTopic = {
    id: number
    entity_type: string
    label: string
    api_url: string
    abgeordnetenwatch_url: string
    description: string
    parent?: EntityTopic
}

export type EntityCandidacyMandate = {
    id: number
    entity_type: string
    label: string
    api_url: string
    id_external_administration: string
    id_external_administration_description: string
    type: "candidacy" | "mandate"
    parliament_period: EntityParliamentPeriod
    politician: EntityPolitician
    party: any
    start_date: string
    end_date: string
    info: string
    electoral_data: any
    fraction_membership: any
    related_data?: any
}