export const functions = [
  {
    name: 'extract_keywords',
    description:
      'Extract keywords from a block of text, so we can categorize it later.',
    parameters: {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          description:
            'A required array of exactly 5 capitalized tags we could categorize this story by, e.g. Problem-Solving, Adaptability, Collaboration, Conflict-Resolution, Organization',
          items: {
            type: 'string',
            description:
              'A keyword we could use to categorize this block of text.',
          },
        },
      },
      required: ['tags'],
    },
  },
  {
    name: 'extract_possible_questions',
    description:
      'Give 3 potential interview questions where I could apply this story in my answer, and a sample answer for each question.',
    parameters: {
      type: 'object',
      properties: {
        questions: {
          type: 'array',
          description:
            'An array of 3 objects, each representing an interview question and a sample answer, e.g. ell me about a situation where you faced unexpected challenges at work. How did you handle it?", "Can you describe a time when you had to work with a cross-functional team to resolve an issue or complete a project? What was the outcome?"',
          items: {
            type: 'object',
            description:
              'An object representing a possible interview question, with a property for the question, and a property for a sample answer.',
            properties: {
              question: {
                type: 'string',
                description:
                  'A string representing a possible interview question.',
              },
              sample: {
                type: 'string',
                description:
                  'A string representing an example of an answer for this interview question.',
              },
            },
          },
        },
      },
      required: ['questions'],
    },
  },
]
