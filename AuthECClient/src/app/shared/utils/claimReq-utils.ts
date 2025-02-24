export const claimReq = {
  adminOnly: (c: any) => c.role === 'Admin',
  adminOrTeacher: (c: any) => c.role === 'Admin' || c.role === 'Teacher',
  hasLibraryId: (c: any) => 'libraryId' in c,
  isFemaleAndTeacher: (c: any) => c.gender === 'Female' && c.role === 'Teacher',
  isFemaleAndBelow10: (c: any) => c.gender === 'Female' && c.age < 10,
};
