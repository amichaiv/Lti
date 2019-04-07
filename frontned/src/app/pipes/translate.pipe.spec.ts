import { TranslatePipe } from "./translate.pipe";
import { TranslateService } from "../services/translate.service";

describe("TransltePipe", () => {
  it("create an instance", () => {
    let service: TranslateService;
    const pipe = new TranslatePipe(service);
    expect(pipe).toBeTruthy();
  });
});
