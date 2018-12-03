import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";
import Game from "./Game";

@Entity()
class Guess extends BaseEntity {
  public static min = 0;
  public static max = 20;

  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  guess: number;

  @ManyToOne(() => Game, game => game.guesses)
  game: Game;
}

export default Guess;
