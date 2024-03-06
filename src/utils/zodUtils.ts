import { z } from "zod";

export const enumKeyValueObject = z.object({
	key: z.string(),
	enumValue: z.string(),
});
