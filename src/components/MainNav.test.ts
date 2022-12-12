import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MainNav from "./MainNav.vue";
import { router } from "@/router";

vi.mock("@/components/RestartButton.vue", () => ({
  default: vi.fn(),
}));

describe("MainNav", () => {
  it("renders properly", () => {
    const wrapper = mount(MainNav, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain("À propos");
  });
});
