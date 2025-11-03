### `create-account-and-login`
- [x] Pick zero state
- [x] wire up Profile buttons for login, ~settings~, etc
  - punting wiring profile settings until a more defined need comes
- [x] move login to modal or page launched from login button
- [x] Fix login to return group and role if available
- [x] Add form validation to login form

### `group-management`
Enables group management for a user
- [x] Group Page
- [x] View your group's detals
- [x] Create new group flow
  - [x] Set Season length
  - [x] Set Theme length
- [ ] CRUD group members
  - For mvp, users can only be in 1 group
  - [x] Users can join a group with a link
    - link should expire
  - [x] Users can join a group with an invite code
    - code should expire
  - [x] unauthed user, login or create account -> group join flow
  - [ ] Users can generate an invite link/code
  - [ ] Users can only join 1 group, if they get to the join page with code
        and they are in a group already, joining should fail
- [ ] Update Group Details
  - Need to decided what can be updated for MVP if anything for now, might punt

### `theme-pick-history`
Enables users to see group pick history for past themes

### `spotify-api-integration`
- [ ] design spotify flow
- [ ] submit picks with spotify

### `ui-updates`
- [ ] "home" should be picks when authed, login when not authed
  - [ ] make login static again instead of modal
- [ ] optimize for mobile
- [ ] full dark mode light mode

### `global-history`
Enables users to see pick history for themes on all groups

### `uncategorized`
- [ ] edit pick
- [ ] voting
