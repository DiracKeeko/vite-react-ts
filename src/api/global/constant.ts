type UserInfo = {
  userId: string;
  userName: string;
  userAuthority: string;
};

type Group = 'GROUP1' | 'GROUP2' | 'GROUP3' | 'GROUP4' | 'GROUP5';
type Room = Group | 'ROOM';
type Perspective = 'SELF' | Room;

const ROOM = 'ROOM';
const GROUP1 = 'GROUP1';
const GROUP2 = 'GROUP2';
const GROUP3 = 'GROUP3';
const GROUP4 = 'GROUP4';
const GROUP5 = 'GROUP5';
const GROUPS: string[] = [GROUP1, GROUP2, GROUP3, GROUP4, GROUP5];
const SELF = 'SELF';

const groupDesc: Map<string, string> = new Map([
  [GROUP1, '一组'],
  [GROUP2, '二组'],
  [GROUP3, '三组'],
  [GROUP4, '四组'],
  [GROUP5, '五组']
]);

export { groupDesc, GROUPS, ROOM, SELF };
export type { Group, Perspective, Room, UserInfo };
