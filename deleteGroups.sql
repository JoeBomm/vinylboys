-- for debugging, temp file


delete from [PickLog] where groupId = $groupId;
delete from [GroupTheme] where groupId = $groupId;
delete from [GroupMember] where groupId = $groupId;
delete from [Group] where id = $groupId;

select * from [PickLog];
select * from [GroupTheme];
select * from [GroupMember];
select * from [Group];