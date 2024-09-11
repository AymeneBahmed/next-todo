import NewTodoForm from "@/components/todos/NewTodoForm";
import TodosTable from "@/components/todos/TodosTable";
import AvatarDropdownMenu from "@/components/AvatarDropdownMenu";
import Avatar from "@/components/Avatar";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <div className="absolute right-10 top-10">
        <AvatarDropdownMenu
          className="relative"
          userFullName={session?.user?.name || ""}
        >
          <Avatar className="size-[4rem] z-10" />
          <div className="size-full absolute scale-[1.12] top-0 z-0 rounded-full bg-gradient-to-br from-emerald-300 to-primary"></div>
        </AvatarDropdownMenu>
      </div>
      <div className="container mx-auto py-10">
        <NewTodoForm />
        <TodosTable />
      </div>
    </>
  );
}
