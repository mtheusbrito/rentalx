import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./User";

@Entity("users_tokens")
class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
  // Muitos users tokens para um usuário

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserTokens };
