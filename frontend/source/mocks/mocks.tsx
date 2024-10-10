export const locationDetail = [
  "Hồ Chí Minh",
  "Hà Nội",
  "Vinh",
  "Nha Trang",
  "Huế",
  "Đà Nẵng",
];
export const locationOverall = ["Hồ Chí Minh", "Hà Nội", "Vinh"];

export const timelineData = [
  { id: "1", title: "3", children: ["Event A", "Event B"] },
  { id: "2", title: "4", children: ["Event A", "Event B"] },
  { id: "3", title: "5", children: ["Event A", "Event B"] },
  { id: "4", title: "6", children: ["Event A", "Event B"] },
  { id: "5", title: "7", children: ["Event A", "Event B"] },
  { id: "6", title: "8", children: ["Event A", "Event B"] },
  { id: "7", title: "8", children: ["Event A", "Event B"] },
  { id: "8", title: "8", children: ["Event A", "Event B"] },
  { id: "9", title: "8", children: ["Event A", "Event B"] },
  { id: "10", title: "8", children: ["Event A", "Event B"] },
  { id: "11", title: "8", children: ["Event A", "Event B"] },
];

export const userMocks = [
  {
    key: "1",
    fullName: "A",
    email: "ab@example.com",
    phoneNumber: "123456789",
    roleId: "ADMIN",
    banStatus: false,
  },
  {
    key: "2",
    fullName: "B",
    email: "bc@example.com",
    phoneNumber: "987654321",
    roleId: "STAFF",
    banStatus: true,
  },
];

export const statusMap: {
  [key: number]: { text?: string; color?: string; width?: string };
} = {
  1: { text: "Finished", color: "green", width: "18%" },
  2: { text: "Cancelled", color: "red", width: "20.5%" },
  3: { text: "Progress", color: "orange", width: "18.8%" },
};