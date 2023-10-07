import { Database } from './dbTypes'

type DatabaseTables = Database['public']['Tables']

export type RoleRow = DatabaseTables['roles']['Row']
export type RoleInsert = DatabaseTables['roles']['Insert']
export type RoleUpdate = DatabaseTables['roles']['Update']

export type StoryRow = DatabaseTables['stories']['Row']
export type StoryInsert = DatabaseTables['stories']['Insert']
export type StoryUpdate = DatabaseTables['stories']['Update']

export type TagRow = DatabaseTables['tags']['Row']
export type TagInsert = DatabaseTables['tags']['Insert']
export type TagUpdate = DatabaseTables['tags']['Update']

export type StoriesTagsRow = DatabaseTables['stories_tags']['Row']
export type StoriesTagsInsert = DatabaseTables['stories_tags']['Insert']
export type StoriesTagsUpdate = DatabaseTables['stories_tags']['Update']
export type StoriesTagsRelations =
  DatabaseTables['stories_tags']['Relationships']
