export default {
  CONNECTION: "connection",
  DISCONNECTION: "disconnect",

  USER: {
    JOIN: "user:join",
    LEAVE: "user:leave",
    VOTE: "user:vote",
    UNVOTE: "user:unvote",
    SPECTATOR_MODE: "user:spec-mode",
  },

  ROOM: {
    START: "room:start",
    REVEAL: "room:reveal",
    NAME_CHANGE: "room:name-change",
    SET_TIMER: "room:set-timer",
  },

  ISSUE: {
    NEW: "issue:new",
    REMOVE: "issue:remove",
    NAME_CHANGE: "issue:name-change",
    SELECT: "issue:select",
    DESELECT: "issue:deselect",
  },
}
