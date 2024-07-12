import { Theme, useTheme } from "remix-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const [, setTheme] = useTheme()

  return (
   <>
     <Button onClick={() => setTheme(Theme.LIGHT)}>
        Light
    </Button>
    <Button onClick={() => setTheme(Theme.DARK)}>
        Dark
    </Button>
   </>
  )
}
