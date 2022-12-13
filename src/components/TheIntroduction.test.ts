import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import TheIntroduction from "./TheIntroduction.vue";
describe("TheIntroduction", () => {
  it("renders properly", () => {
    const wrapper = mount(TheIntroduction, {
      props: { title: "Hello Vitest" },
    });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
