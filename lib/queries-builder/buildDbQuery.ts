/*
[
   ['platform', 'equals' platform],
   ['name', startsWith, name] 
]

[
    {key: string, operation: string, value: string},
]

*/

/*

  where: {
    AND: [
      {
        content: {
          contains: 'Prisma',
        },
      },
      {
        published: {
          equals: false,
        },
      },
    ],
  },

*/

type TCondition = {
  key: string
  operation: "equals" | "startsWith" | "contains"
  value: string
}

export const buildDbQuery = (conditions: TCondition[]) => {}
