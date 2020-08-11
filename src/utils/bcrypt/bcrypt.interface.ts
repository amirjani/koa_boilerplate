export interface BcryptInterface {
    hashPassword(password: string): Promise<string>;

    comparePassword(password: string, hash: string): Promise<boolean>
}