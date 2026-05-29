const STORAGE_KEY_PREFIX = "VUE_ELEMENT_TEMPLATE_";

const UPPER_SNAKE_CASE_KEY = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const warnStorageKey = (key: string) => {
  if (!UPPER_SNAKE_CASE_KEY.test(key)) {
    console.warn(
      `[storage] key "${key}" should be UPPER_SNAKE_CASE (e.g. ACCESS_TOKEN, LOCALE)`
    );
  }
};

class Storage {
  private readonly driver: globalThis.Storage;
  private readonly prefix: string;

  constructor(driver: globalThis.Storage, prefix: string) {
    this.driver = driver;
    this.prefix = prefix;
  }

  private resolveKey(key: string) {
    warnStorageKey(key);
    return `${this.prefix}${key}`;
  }

  get<T = unknown>(key: string, defaultValue?: T): T | null {
    const raw = this.driver.getItem(this.resolveKey(key));
    if (raw === null) {
      return defaultValue ?? null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as T;
    }
  }

  set<T = unknown>(key: string, value: T) {
    this.driver.setItem(this.resolveKey(key), JSON.stringify(value));
  }

  remove(key: string) {
    this.driver.removeItem(this.resolveKey(key));
  }

  clear() {
    const keysToRemove: string[] = [];

    for (let i = 0; i < this.driver.length; i++) {
      const key = this.driver.key(i);
      if (key?.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      this.driver.removeItem(key);
    });
  }

  toStorageLike(): StorageLike {
    return {
      getItem: (key: string) => this.driver.getItem(this.resolveKey(key)),
      setItem: (key: string, value: string) => {
        this.driver.setItem(this.resolveKey(key), value);
      },
      removeItem: (key: string) => {
        this.driver.removeItem(this.resolveKey(key));
      },
    };
  }
}

export const storage = {
  local: new Storage(window.localStorage, STORAGE_KEY_PREFIX),
  session: new Storage(window.sessionStorage, STORAGE_KEY_PREFIX),
};

export { STORAGE_KEY_PREFIX };
