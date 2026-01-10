import { Snowflake } from "../gateway/types/gatewayTypes";

export interface Message {
    id: Snowflake;
    chennelID: Snowflake;
    content: string;
    guildID: Snowflake;
    
}