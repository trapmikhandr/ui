/** biome-ignore-all lint/suspicious/noArrayIndexKey: <storybook> */
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/button";
import { colorContract, globalContract } from "@/themes";
import { LandingLayout } from "./landing-layout";

const meta: Meta<typeof LandingLayout> = {
  title: "Components/Layout/LandingLayout",
  component: LandingLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// === Simple example ===
export const Simple: Story = {
  render: () => (
    <LandingLayout>
      <LandingLayout.Header>
        <LandingLayout.Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: colorContract.primary.base,
              }}
            >
              poliglot
            </span>
            <nav style={{ display: "flex", gap: globalContract.spacing.lg }}>
              <a
                href="#features"
                style={{
                  color: colorContract.onSurface.default,
                  textDecoration: "none",
                }}
              >
                Features
              </a>
              <a
                href="#pricing"
                style={{
                  color: colorContract.onSurface.default,
                  textDecoration: "none",
                }}
              >
                Pricing
              </a>
              <a
                href="#contact"
                style={{
                  color: colorContract.onSurface.default,
                  textDecoration: "none",
                }}
              >
                Contact
              </a>
            </nav>
            <Button variant="filled" size="small">
              Sign in
            </Button>
          </div>
        </LandingLayout.Container>
      </LandingLayout.Header>

      <LandingLayout.Section>
        <LandingLayout.Container>
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <h1
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: colorContract.onSurface.default,
                marginBottom: globalContract.spacing.md,
              }}
            >
              Welcome to poliglot
            </h1>
            <p
              style={{
                fontSize: 20,
                color: colorContract.onSurface.variant,
                marginBottom: globalContract.spacing.xl,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Build amazing applications with our UI library
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <Button variant="filled" size="large">
                Get started for free
              </Button>
              <Button variant="outlined" size="large">
                Learn more
              </Button>
            </div>
          </div>
        </LandingLayout.Container>
      </LandingLayout.Section>

      <LandingLayout.Section variant="accent">
        <LandingLayout.Container>
          <h2
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: colorContract.onSurface.default,
              marginBottom: globalContract.spacing.lg,
              textAlign: "center",
            }}
          >
            Our features
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: globalContract.spacing.lg,
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  padding: globalContract.spacing.lg,
                  borderRadius: globalContract.shape.md,
                  backgroundColor: colorContract.surface.containerHigh,
                }}
              >
                <h3
                  style={{
                    color: colorContract.onSurface.default,
                    marginBottom: globalContract.spacing.sm,
                  }}
                >
                  Feature {i}
                </h3>
                <p style={{ color: colorContract.onSurface.variant }}>
                  Description for feature {i}. Lorem ipsum dolor sit amet.
                </p>
              </div>
            ))}
          </div>
        </LandingLayout.Container>
      </LandingLayout.Section>

      <LandingLayout.Footer>
        <LandingLayout.Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: globalContract.spacing.md,
            }}
          >
            <span style={{ color: colorContract.onSurface.variant }}>
              © 2025 poliglot. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: globalContract.spacing.lg }}>
              <a
                href="#privacy"
                style={{
                  color: colorContract.onSurface.variant,
                  textDecoration: "none",
                }}
              >
                Privacy
              </a>
              <a
                href="#terms"
                style={{
                  color: colorContract.onSurface.variant,
                  textDecoration: "none",
                }}
              >
                Terms
              </a>
            </div>
          </div>
        </LandingLayout.Container>
      </LandingLayout.Footer>
    </LandingLayout>
  ),
};

// === Extended example with multiple sections ===
export const FullPage: Story = {
  render: () => (
    <LandingLayout>
      <LandingLayout.Header>
        <LandingLayout.Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: colorContract.primary.base,
              }}
            >
              poliglot
            </span>
            <nav
              style={{
                display: "flex",
                gap: globalContract.spacing.xl,
                alignItems: "center",
              }}
            >
              <a
                href="#hero"
                style={{
                  color: colorContract.onSurface.default,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Home
              </a>
              <a
                href="#features"
                style={{
                  color: colorContract.onSurface.default,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Features
              </a>
              <a
                href="#pricing"
                style={{
                  color: colorContract.onSurface.default,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                style={{
                  color: colorContract.onSurface.default,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Testimonials
              </a>
              <Button variant="filled" size="small">
                Get started
              </Button>
            </nav>
          </div>
        </LandingLayout.Container>
      </LandingLayout.Header>

      {/* Hero Section */}
      <LandingLayout.Section>
        <LandingLayout.Container>
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <h1
              style={{
                fontSize: 64,
                fontWeight: "bold",
                color: colorContract.onSurface.default,
                marginBottom: globalContract.spacing.lg,
                lineHeight: 1.2,
              }}
            >
              Build better
              <br />
              <span style={{ color: colorContract.primary.base }}>
                web applications
              </span>
            </h1>
            <p
              style={{
                fontSize: 20,
                color: colorContract.onSurface.variant,
                marginBottom: globalContract.spacing.xl,
                maxWidth: 700,
                margin: "0 auto 32px",
              }}
            >
              Modern UI library with Material Design 3, dark mode, and full
              TypeScript support
            </p>
            <div
              style={{
                display: "flex",
                gap: globalContract.spacing.md,
                justifyContent: "center",
              }}
            >
              <Button variant="filled" size="large">
                Get started for free
              </Button>
              <Button variant="outlined" size="large">
                View demo
              </Button>
            </div>
          </div>
        </LandingLayout.Container>
      </LandingLayout.Section>

      {/* Features Section */}
      <LandingLayout.Section variant="accent">
        <LandingLayout.Container>
          <h2
            style={{
              fontSize: 42,
              fontWeight: "bold",
              color: colorContract.onSurface.default,
              marginBottom: globalContract.spacing.xl,
              textAlign: "center",
            }}
          >
            Why choose us
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: globalContract.spacing.lg,
            }}
          >
            {[
              {
                title: "Material Design 3",
                description:
                  "We follow the latest design standards from Google",
              },
              {
                title: "Dark mode",
                description: "Automatic switching and customization",
              },
              {
                title: "TypeScript",
                description: "Full type safety out of the box",
              },
              {
                title: "Performance",
                description: "Optimized for maximum speed",
              },
              {
                title: "Accessibility",
                description: "WCAG 2.1 AA compatibility",
              },
              {
                title: "React Aria",
                description: "Built-in React Aria support",
              },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  padding: globalContract.spacing.xl,
                  borderRadius: globalContract.shape.lg,
                  backgroundColor: colorContract.surface.containerHigh,
                  border: `1px solid ${colorContract.outline.variant}`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: globalContract.shape.md,
                    backgroundColor: colorContract.primary.container,
                    marginBottom: globalContract.spacing.md,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    color: colorContract.onSurface.default,
                    marginBottom: globalContract.spacing.sm,
                    fontWeight: 600,
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: colorContract.onSurface.variant }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </LandingLayout.Container>
      </LandingLayout.Section>

      {/* Pricing Section */}
      <LandingLayout.Section>
        <LandingLayout.Container>
          <h2
            style={{
              fontSize: 42,
              fontWeight: "bold",
              color: colorContract.onSurface.default,
              marginBottom: globalContract.spacing.xl,
              textAlign: "center",
            }}
          >
            Choose your plan
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: globalContract.spacing.lg,
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            {[
              {
                name: "Free",
                price: "0₽",
                features: ["10 projects", "Basic support"],
              },
              {
                name: "Pro",
                price: "999₽",
                features: [
                  "Unlimited projects",
                  "Priority support",
                  "All components",
                ],
              },
              {
                name: "Team",
                price: "4999₽",
                features: ["Everything in Pro", "Team collaboration", "SLA"],
              },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  padding: globalContract.spacing.xl,
                  borderRadius: globalContract.shape.lg,
                  backgroundColor:
                    i === 1
                      ? colorContract.primary.container
                      : colorContract.surface.containerHigh,
                  border: `2px solid ${i === 1 ? colorContract.primary.base : colorContract.outline.variant}`,
                }}
              >
                <h3
                  style={{
                    fontSize: 24,
                    color:
                      i === 1
                        ? colorContract.primary.onContainer
                        : colorContract.onSurface.default,
                    marginBottom: globalContract.spacing.sm,
                    fontWeight: 600,
                  }}
                >
                  {plan.name}
                </h3>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: "bold",
                    color:
                      i === 1
                        ? colorContract.primary.onContainer
                        : colorContract.onSurface.default,
                    marginBottom: globalContract.spacing.lg,
                  }}
                >
                  {plan.price}
                  <span style={{ fontSize: 16, fontWeight: "normal" }}>
                    /month
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    marginBottom: globalContract.spacing.lg,
                  }}
                >
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      style={{
                        color:
                          i === 1
                            ? colorContract.primary.onContainer
                            : colorContract.onSurface.variant,
                        marginBottom: globalContract.spacing.sm,
                      }}
                    >
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={i === 1 ? "filled" : "outlined"}
                  fullWidth
                  size="large"
                >
                  Choose plan
                </Button>
              </div>
            ))}
          </div>
        </LandingLayout.Container>
      </LandingLayout.Section>

      {/* CTA Section */}
      <LandingLayout.Section variant="accent">
        <LandingLayout.Container>
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              backgroundColor: colorContract.primary.container,
              borderRadius: globalContract.shape.xl,
              paddingLeft: globalContract.spacing.lg,
              paddingRight: globalContract.spacing.lg,
            }}
          >
            <h2
              style={{
                fontSize: 36,
                fontWeight: "bold",
                color: colorContract.primary.onContainer,
                marginBottom: globalContract.spacing.md,
              }}
            >
              Ready to get started?
            </h2>
            <p
              style={{
                fontSize: 18,
                color: colorContract.primary.onContainer,
                marginBottom: globalContract.spacing.xl,
                opacity: 0.9,
              }}
            >
              Join thousands of developers today
            </p>
            <Button variant="filled" size="large">
              Get started for free
            </Button>
          </div>
        </LandingLayout.Container>
      </LandingLayout.Section>

      <LandingLayout.Footer>
        <LandingLayout.Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: globalContract.spacing.xl,
              marginBottom: globalContract.spacing.xl,
            }}
          >
            <div>
              <h4
                style={{
                  color: colorContract.onSurface.default,
                  marginBottom: globalContract.spacing.sm,
                }}
              >
                Product
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: globalContract.spacing.xs,
                }}
              >
                <a
                  href="#features"
                  style={{
                    color: colorContract.onSurface.variant,
                    textDecoration: "none",
                  }}
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  style={{
                    color: colorContract.onSurface.variant,
                    textDecoration: "none",
                  }}
                >
                  Pricing
                </a>
              </div>
            </div>
            <div>
              <h4
                style={{
                  color: colorContract.onSurface.default,
                  marginBottom: globalContract.spacing.sm,
                }}
              >
                Company
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: globalContract.spacing.xs,
                }}
              >
                <a
                  href="#about"
                  style={{
                    color: colorContract.onSurface.variant,
                    textDecoration: "none",
                  }}
                >
                  About us
                </a>
                <a
                  href="#contact"
                  style={{
                    color: colorContract.onSurface.variant,
                    textDecoration: "none",
                  }}
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4
                style={{
                  color: colorContract.onSurface.default,
                  marginBottom: globalContract.spacing.sm,
                }}
              >
                Legal
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: globalContract.spacing.xs,
                }}
              >
                <a
                  href="#privacy"
                  style={{
                    color: colorContract.onSurface.variant,
                    textDecoration: "none",
                  }}
                >
                  Privacy
                </a>
                <a
                  href="#terms"
                  style={{
                    color: colorContract.onSurface.variant,
                    textDecoration: "none",
                  }}
                >
                  Terms of use
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              paddingTop: globalContract.spacing.lg,
              borderTop: `1px solid ${colorContract.outline.variant}`,
              textAlign: "center",
              color: colorContract.onSurface.variant,
            }}
          >
            © 2025 poliglot. All rights reserved.
          </div>
        </LandingLayout.Container>
      </LandingLayout.Footer>
    </LandingLayout>
  ),
};

// === Minimal example ===
export const Minimal: Story = {
  render: () => (
    <LandingLayout>
      <LandingLayout.Header>
        <LandingLayout.Container>
          <span style={{ fontWeight: "bold", fontSize: 20 }}>Logo</span>
        </LandingLayout.Container>
      </LandingLayout.Header>

      <LandingLayout.Section>
        <LandingLayout.Container>
          <h1>Page heading</h1>
          <p>Page content</p>
        </LandingLayout.Container>
      </LandingLayout.Section>

      <LandingLayout.Footer>
        <LandingLayout.Container>
          <p
            style={{
              textAlign: "center",
              color: colorContract.onSurface.variant,
            }}
          >
            © 2025 Company
          </p>
        </LandingLayout.Container>
      </LandingLayout.Footer>
    </LandingLayout>
  ),
};
