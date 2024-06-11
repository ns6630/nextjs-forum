import { redirect } from "next/navigation";
import { Button, Flex, TextInput } from "@mantine/core";
import { getSession, login, logout } from "@/lib";
import Layout from "@/components/Layout";

export default async function HomePage() {
  const session = await getSession();
  return (
    <Layout>
      <section>
        <form
          action={async (formData) => {
            "use server";

            await login(formData);
            redirect("/");
          }}
        >
          <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <TextInput type="email" label="Email" />
            <Button type="submit">Login</Button>
          </Flex>
        </form>
        <form
          action={async () => {
            "use server";

            await logout();
            redirect("/");
          }}
        >
          <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <Button type="submit">Logout</Button>
          </Flex>
        </form>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </section>
    </Layout>
  );
}
