import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./components/ui/form";
import FormInput from "./components/form/FormInput";
import Button from "./components/Button";
import { SendIcon, TrashIcon } from "lucide-react";
import FormSelect from "./components/form/FormSelect";

function App() {
  const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    email: z.email("Invalid email"),
    country: z.string().min(1, "Country is required"),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      email: "",
      country: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);
  };

  return (
    <div className="container mx-auto pt-4">
      <h1>Form components</h1>
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={form.control}
              name="firstName"
              label="First name"
              autoFocus
              required
            />

            <FormInput
              control={form.control}
              name="email"
              label="Email"
              required
            />

            <FormSelect
              label="Country"
              name="country"
              options={[
                { label: "Colombia", value: "CO" },
                { label: "USA", value: "US" },
                { label: "Canada", value: "CA" },
              ]}
              control={form.control}
              required
            />

            <div className="flex items-center flex-wrap justify-between mt-6">
              <Button
                variant="destructive"
                icon={<TrashIcon />}
                title="reset form"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="w-full md:w-auto"
                loading={form.formState.isSubmitting}
                title="submit form"
                icon={<SendIcon />}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default App;
