import { CastMemberOutput } from '@core/cast-member/application/use-cases/common/cast-member-output';

export interface GetCastMemberInput {
  id: string;
}

export type GetCastMemberOutput = CastMemberOutput;
