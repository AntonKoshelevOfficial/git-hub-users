export type ActionType = {
    type: string,
    payload?: any,
}

export type ReposListType = {
    id: number,
    name: string,
    html_url: string,
    forks_count: number,
    stargazers_count: number,
}

export type UsersListItemType = {
    id: number,
    url: string,
    bio?: string,
    type: string,
    login: string,
    email?: string,
    node_id: string,
    html_url: string,
    location?: string,
    gists_url: string,
    repos_url: string,
    site_admin: boolean,
    avatar_url: string,
    events_url: string,
    repos_list: ReposListType[],
    created_at?: string,
    starred_url: string,
    gravatar_id: string,
    repos_count?: number,
    followers_url: string,
    following_url: string,
    followers_count?: number,
    following_count?: number,
    subscriptions_url: string,
    organizations_url: string,
    received_events_url: string,
}