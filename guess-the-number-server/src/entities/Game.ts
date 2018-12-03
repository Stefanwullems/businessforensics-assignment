import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany
} from "typeorm";
import Guess from "./Guess";

@Entity()
class Game extends BaseEntity {
  public static maxGuesses = 3;

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  hiddenNumber: number;

  @Column("bool", { nullable: true })
  won: boolean | null;

  @JoinColumn()
  @OneToMany(() => Guess, guess => guess.game)
  guesses: Guess[];
}

export default Game;
