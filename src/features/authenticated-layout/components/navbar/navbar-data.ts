export const pageTitles: Record<string, string> = {
  users: "Users",
  "users/new": "Add New User",
  notifications: "Notifications",
  nutrition: "Nutrition",
  activity: "Activity",
  "users/[id]/upgrade-subscription": "Upgrade Subscription",
  "users/[id]/profile": "Profile"
};

export interface Breadcrumb {
  title: string;
  path?: string;
}

export const breadcrumbs: Record<string, Breadcrumb[]> = {
  "users/new": [{ title: "Users", path: "/users" }, { title: "Add New User" }],
  "users/[id]/upgrade-subscription": [{ title: "Users", path: "/users" }, { title: "Upgrade Subscription" }],
  "users/[id]/profile": [{ title: "Users", path: "/users" }, { title: "Profile" }]
};
