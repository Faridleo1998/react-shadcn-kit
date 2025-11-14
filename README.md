# rect-shadcn-kit

Colección de *wrappers* y componentes reutilizables basados en
**shadcn/ui**, diseñados para agilizar el desarrollo de interfaces en
proyectos React con TypeScript.

Este kit incluye componentes tanto en su versión **base** como en su
versión integrada con **React Hook Form**, permitiendo una
implementación rápida, consistente y tipada.

------------------------------------------------------------------------

## 🚀 Características

-   🎨 Wrappers basados en **shadcn/ui**
-   ⚛️ Componentes en **React + TypeScript**
-   🧩 Versiones **base** y **RHF** para formularios
-   📦 Actualmente disponible:
    -   **Input**
    -   **Select**
-   🧱 Diseño consistente, validación sencilla y DX mejorada

------------------------------------------------------------------------

## 📦 Instalación
1. Instala tailwind.
2. Instala shadcn.
3. Copia y pega el codigo del wrapper.
4. Instala los componentes de shadcn que necesita el wrapper.

Para utilizar los wrappers de form, debes tener instalado react hook form.

------------------------------------------------------------------------

## 🧩 Componentes disponibles

### ✔️ Input

-   `Input` (base)
-   `FormInput` (integrado con React Hook Form)

### ✔️ Select

-   `Select` (base)
-   `FormSelect` (integrado con React Hook Form)

------------------------------------------------------------------------

## 💡 Uso básico

### **Input base**

``` tsx
import { Input } from "rect-shadcn-kit";

export default function Example() {
  return <Input label="Nombre" placeholder="Tu nombre" />;
}
```

### **Input con React Hook Form**

``` tsx
import { useForm } from "react-hook-form";
import { FormInput } from "rect-shadcn-kit";

export default function FormExample() {
  const form = useForm();

  return (
    <form>
      <FormInput
        control={form.control}
        name="email"
        label="Correo"
        placeholder="correo@example.com"
      />
    </form>
  );
}
```

### **Select base**

``` tsx
import { Select } from "rect-shadcn-kit";

export default function Example() {
  return (
    <Select
      label="País"
      options={[
        { label: "Colombia", value: "co" },
        { label: "México", value: "mx" },
      ]}
    />
  );
}
```

### **Select con React Hook Form**

``` tsx
import { useForm } from "react-hook-form";
import { FormSelect } from "rect-shadcn-kit";

export default function Example() {
  const form = useForm();

  return (
    <form>
      <FormSelect
        control={form.control}
        name="country"
        label="País"
        options={[
          { label: "Colombia", value: "co" },
          { label: "México", value: "mx" },
        ]}
      />
    </form>
  );
}
```

------------------------------------------------------------------------

## 🛠️ Motivación

Este repositorio nace para evitar repetir la misma configuración cada
vez que se inicia un proyecto con shadcn/ui.

Con este kit puedes:

-   Mantener un diseño consistente entre proyectos.
-   Reducir código repetido en formularios.
-   Aumentar la productividad en etapas iniciales.
-   Enfocarte en la lógica en lugar de la UI.

------------------------------------------------------------------------

## 🗺️ Roadmap

-   ✔️ Input\
-   ✔️ Select\
-   ⬜ Textarea\
-   ⬜ Button wrapper\
-   ⬜ Datepicker wrapper\
-   ⬜ Documentación completa\
-   ⬜ Demo en Storybook\
-   ⬜ Publicación en npm

------------------------------------------------------------------------

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!\
Abre un issue o un pull request con ideas, mejoras o nuevos wrappers.

------------------------------------------------------------------------

## 📄 Licencia

MIT License © Farid Moreno
