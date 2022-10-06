import crypto from "crypto";

export class Transaction {
  private _id: string;
  private _title: string;
  private _value: number;
  private _type: "income" | "outcome";
  private _archived: boolean

  constructor(title: string, value: number, type: "income" | "outcome") {
    this._id = crypto.randomUUID();
    this._title = title;
    this._value = value;
    this._type = type;
    this._archived = false;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get value() {
    return this._value;
  }

  get type() {
    return this._type;
  }

  get archived() {
    return this._archived;
  }

  transactionUpdate(title: string, value: number, type: "income" | "outcome") {
    this._title = title;
    this._value = value;
    this._type = type;
  }

  toReturn() {
    return {
      id: this._id,
      title: this._title,
      value: this._value,
      type: this._type,
    };
  }

  alterarStatusArquivo(status: boolean) {
    this._archived = status;
  }
}
