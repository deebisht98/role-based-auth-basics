export type User = {
    id:number;
    email : string;
    role: "admin" | "viewer";
}