"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const phonePattern = /^\+?[0-9\s\-]{8,16}$/;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    clinic: "",
    name: "",
    phone: "",
    city: "",
    treatment: "Dental implants",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.documentElement.classList.add("js");
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }, []);

  const validateField = (name: string, value: string) => {
    const trimmed = value.trim();

    if (name === "clinic") {
      return trimmed ? "" : "Enter your clinic name.";
    }

    if (name === "name") {
      return trimmed ? "" : "Enter your name.";
    }

    if (name === "phone") {
      if (!trimmed) return "Enter a WhatsApp number.";
      if (!phonePattern.test(trimmed)) {
        return "Enter a number with country code, e.g. +971 50 123 4567.";
      }
      return "";
    }

    if (name === "city") {
      return trimmed ? "" : "Choose the city your clinic is in.";
    }

    return "";
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    const nextError = validateField(name, value);
    setErrors((current) => {
      const next = { ...current };
      if (nextError) {
        next[name] = nextError;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const nextError = validateField(name, value);
    setErrors((current) => {
      const next = { ...current };
      if (nextError) {
        next[name] = nextError;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    Object.entries(values).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) nextErrors[name] = error;
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  };

  const firstName = values.name.trim().split(" ")[0] || "we've got it";

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container">
          <nav className={`nav ${menuOpen ? "open" : ""}`} aria-label="Main">
            <a className="brand" href="#top" aria-label="Smile Lead Provider, home">
              <span className="brand-mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 64 64">
                  <path
                    fill="currentColor"
                    d="M19 9c-6 0-11 5-11 12 0 7 4 11 7 16 3 5 2 18 8 18 4 0 4-10 9-10s5 10 9 10c6 0 5-13 8-18 3-5 7-9 7-16 0-7-5-12-11-12-6 0-9 4-13 4s-7-4-13-4z"
                  />
                </svg>
              </span>
              Smile Lead Provider
            </a>
            <div className="nav-links" id="nav-links">
              <a href="#how" onClick={() => setMenuOpen(false)}>
                How it works
              </a>
              <a href="#treatments" onClick={() => setMenuOpen(false)}>
                Treatments
              </a>
              <a href="#compare" onClick={() => setMenuOpen(false)}>
                Why us
              </a>
              <a href="#faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </a>
              <a className="btn btn-primary" href="#audit" onClick={() => setMenuOpen(false)}>
                Request free audit
              </a>
            </div>
            <a className="btn btn-primary btn-sm" href="#audit">
              Request free audit
            </a>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="nav-links"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span className="visually-hidden">Menu</span>
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M0 1h18M0 7h18M0 13h18" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container">
            <div className="hero-grid">
              <div>
                <h1 id="hero-title">Pay for patient enquiries, not ad spend.</h1>
                <p className="lede">
                  We fund and run the ad campaigns for your clinic. You never set a budget or open a
                  ad account. You get enquiries from people asking about treatments you offer, and you
                  pay only for the ones that qualify.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#audit">
                    Request free audit
                  </a>
                  <a className="btn btn-secondary" href="#how">
                    How it works
                  </a>
                </div>
                <p className="hero-note">
                  <strong>From AED 29 per qualified lead.</strong> We take on 6 clinic partnerships per
                  city each month.
                </p>
              </div>

              <figure className="slip-wrap" aria-label="Example of how enquiries are qualified">
                <div className="slip slip-rejected" aria-hidden="true">
                  <div className="slip-row">
                    <span className="treat">Veneers, Al Ain</span>
                    <span>Outside your area</span>
                  </div>
                  <div className="slip-row" style={{ marginTop: "4px" }}>
                    <span>Not sent to you</span>
                    <span className="not-charged">AED 0</span>
                  </div>
                </div>

                <div className="slip slip-main">
                  <div className="slip-head">
                    <span>
                      <b>New enquiry</b> for your clinic
                    </span>
                    <span>2 min ago</span>
                  </div>
                  <div className="slip-body">
                    <p className="slip-treatment">Dental implants</p>
                    <dl className="slip-meta">
                      <dt>Area</dt>
                      <dd>Dubai Marina</dd>
                      <dt>Contact by</dt>
                      <dd>WhatsApp</dd>
                    </dl>
                    <ul className="checks" aria-label="Qualification checks">
                      <li className="check">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <circle cx="9" cy="9" r="8" />
                          <path d="M5.5 9.2l2.3 2.3 4.7-4.7" />
                        </svg>
                        Asked about a treatment you offer
                      </li>
                      <li className="check">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <circle cx="9" cy="9" r="8" />
                          <path d="M5.5 9.2l2.3 2.3 4.7-4.7" />
                        </svg>
                        Inside your service area
                      </li>
                      <li className="check">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <circle cx="9" cy="9" r="8" />
                          <path d="M5.5 9.2l2.3 2.3 4.7-4.7" />
                        </svg>
                        Real person, not a bot form fill
                      </li>
                    </ul>
                  </div>
                  <div className="slip-foot">
                    <span>Sent to your clinic only</span>
                    <span className="stamp">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M2 7.3l3 3L12 3.5" />
                      </svg>
                      Qualified
                    </span>
                  </div>
                </div>
                <figcaption className="slip-caption">Example enquiry. Only qualified leads are sent and billed.</figcaption>
              </figure>
            </div>

            <dl className="facts">
              <div className="fact">
                <dt>Upfront ad spend</dt>
                <dd>AED 0</dd>
              </div>
              <div className="fact">
                <dt>Who else gets your leads</dt>
                <dd>No one. They're exclusive.</dd>
              </div>
              <div className="fact">
                <dt>Contract</dt>
                <dd>No lock-in. Pause anytime.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section" id="compare" aria-labelledby="compare-title">
          <div className="container">
            <div className="section-head">
              <h2 id="compare-title">Most clinics pay for marketing whether or not chairs fill.</h2>
              <p>
                Agencies bill a retainer plus your ad budget. Lead lists get resold to the clinic down
                the road. We only get paid when a qualified patient enquiry reaches you.
              </p>
            </div>
            <div className="compare-wrap">
              <table className="compare">
                <caption className="visually-hidden">
                  Comparison of a typical agency, shared lead lists and Smile Lead Provider
                </caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="visually-hidden">Question</span>
                    </th>
                    <th scope="col">Typical agency</th>
                    <th scope="col">Shared lead lists</th>
                    <th scope="col" className="us">
                      Smile Lead Provider
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">What you pay for</th>
                    <td data-label="Typical agency">Monthly retainer plus ad budget</td>
                    <td data-label="Shared lead lists">Enquiries sold to several clinics</td>
                    <td data-label="Smile Lead Provider" className="us">
                      Qualified enquiries only
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Upfront ad spend</th>
                    <td data-label="Typical agency">Yes, paid by you</td>
                    <td data-label="Shared lead lists">Varies</td>
                    <td data-label="Smile Lead Provider" className="us">
                      None. We fund the ads.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Is the lead yours alone?</th>
                    <td data-label="Typical agency">Yes</td>
                    <td data-label="Shared lead lists">No, competitors get it too</td>
                    <td data-label="Smile Lead Provider" className="us">
                      Yes, never resold
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">If results don't come</th>
                    <td data-label="Typical agency">You still pay</td>
                    <td data-label="Shared lead lists">You still pay</td>
                    <td data-label="Smile Lead Provider" className="us">
                      Unqualified leads aren't charged
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Commitment</th>
                    <td data-label="Typical agency">Often a minimum term</td>
                    <td data-label="Shared lead lists">Often a package</td>
                    <td data-label="Smile Lead Provider" className="us">
                      No lock-in, no minimum spend
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section night" id="how" aria-labelledby="how-title">
          <div className="container">
            <div className="section-head">
              <h2 id="how-title">We handle the marketing. You handle the patients.</h2>
              <p>
                You tell us which treatments to grow. We run the campaigns and filter out enquiries that
                don't qualify before they reach you.
              </p>
            </div>
            <ol className="steps">
              <li className="step">
                <span className="step-num" aria-hidden="true">
                  1
                </span>
                <h3>Tell us your services</h3>
                <p>Pick the treatments and areas you want to grow.</p>
              </li>
              <li className="step">
                <span className="step-num" aria-hidden="true">
                  2
                </span>
                <h3>We launch campaigns</h3>
                <p>Funded and managed by us, at no cost to you.</p>
              </li>
              <li className="step">
                <span className="step-num" aria-hidden="true">
                  3
                </span>
                <h3>Leads reach your team</h3>
                <p>Qualified, exclusive enquiries sent straight to your clinic.</p>
              </li>
              <li className="step">
                <span className="step-num" aria-hidden="true">
                  4
                </span>
                <h3>You pay per lead</h3>
                <p>Only for the qualified leads you actually receive.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="section" id="treatments" aria-labelledby="treat-title">
          <div className="container">
            <div className="section-head">
              <h2 id="treat-title">Campaigns built around one treatment at a time.</h2>
              <p>
                Each campaign targets people researching a specific treatment in your service area, not
                general "dentist near me" traffic.
              </p>
            </div>
            <ul className="treatments">
              <li className="treatment">
                <span className="treatment-icon" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 8c3-2 7-1 11 0s8-2 11 0c2 2 2 6 0 11H13c-2-5-2-9 0-11z" />
                    <path d="M18 19h12l-2.5 23h-7z" />
                    <path d="M17.6 25h12.8M18.2 30.5h11.6M18.8 36h10.4" />
                  </svg>
                </span>
                <h3>Dental implants</h3>
                <p>Patients actively researching implant options in your area.</p>
              </li>
              <li className="treatment">
                <span className="treatment-icon" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 6c-5 0-8 4-8 9 0 5 3 8 4 12 2 7 2 15 6 15s3-8 6-8 2 8 6 8 4-8 6-15c1-4 4-7 4-12 0-5-3-9-8-9-4 0-5 2-8 2s-4-2-8-2z" />
                    <path d="M13 13c6-3 16-3 22 0" strokeWidth="3.2" />
                  </svg>
                </span>
                <h3>Veneers</h3>
                <p>Cosmetic dentistry prospects who are ready to improve their smile.</p>
              </li>
              <li className="treatment">
                <span className="treatment-icon" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 11c0 17 7 29 17 29s17-12 17-29" />
                    <path d="M14 11c0 12 4 21 10 21s10-9 10-21" />
                    <path d="M7 11h7M34 11h7" />
                  </svg>
                </span>
                <h3>Invisalign</h3>
                <p>Local search demand for clear aligners, turned into enquiries.</p>
              </li>
              <li className="treatment">
                <span className="treatment-icon" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="12" width="11" height="24" rx="4" />
                    <rect x="18.5" y="12" width="11" height="24" rx="4" />
                    <rect x="32" y="12" width="11" height="24" rx="4" />
                    <path d="M3 24h42" />
                    <rect x="8.5" y="21" width="4" height="6" rx="1" fill="currentColor" />
                    <rect x="22" y="21" width="4" height="6" rx="1" fill="currentColor" />
                    <rect x="35.5" y="21" width="4" height="6" rx="1" fill="currentColor" />
                  </svg>
                </span>
                <h3>Braces</h3>
                <p>A steady flow of orthodontic enquiries from families nearby.</p>
              </li>
              <li className="treatment">
                <span className="treatment-icon" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12c4 9 11 13 19 13s15-4 19-13" />
                    <path d="M8 9c4 7 10 10 16 10s12-3 16-10" />
                    <path d="M12 21v16M20 24.5v16M28 24.5v16M36 21v16" />
                  </svg>
                </span>
                <h3>All-on-4 and All-on-6</h3>
                <p>High-value campaigns for patients exploring fixed full-arch treatment.</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="section" id="audit" aria-labelledby="audit-title" style={{ paddingTop: 0 }}>
          <div className="container audit">
            <div className="audit-copy">
              <h2 id="audit-title">Get a free marketing audit for your clinic.</h2>
              <p>
                We'll review your current online presence and show you where you're losing patients to
                competitors. No cost, no obligation.
              </p>
              <ul className="audit-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" />
                    <path d="M5.5 9.2l2.3 2.3 4.7-4.7" />
                  </svg>
                  <span>A review of your Google Business Profile and local visibility</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" />
                    <path d="M5.5 9.2l2.3 2.3 4.7-4.7" />
                  </svg>
                  <span>Which treatments have the strongest lead potential in your area</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" />
                    <path d="M5.5 9.2l2.3 2.3 4.7-4.7" />
                  </svg>
                  <span>A plain-language action plan you can use with or without us</span>
                </li>
              </ul>
            </div>

            <div className={submitted ? "form-card done" : "form-card"} id="form-card">
              <form id="audit-form" noValidate onSubmit={handleSubmit}>
                <h3>Request your free audit</h3>
                <p className="form-intro">Takes 2 minutes. We'll reply within 24 hours.</p>
                <div className="form-grid">
                  <div className="field field-full" data-invalid={errors.clinic ? "" : undefined}>
                    <label htmlFor="clinic">Clinic name</label>
                    <input
                      id="clinic"
                      name="clinic"
                      autoComplete="organization"
                      placeholder="e.g. Bright Smile Dental"
                      required
                      aria-describedby="clinic-error"
                      value={values.clinic}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.clinic ? "true" : "false"}
                    />
                    <span className="error" id="clinic-error" aria-live="polite">
                      {errors.clinic || ""}
                    </span>
                  </div>

                  <div className="field" data-invalid={errors.name ? "" : undefined}>
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      aria-describedby="name-error"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    <span className="error" id="name-error" aria-live="polite">
                      {errors.name || ""}
                    </span>
                  </div>

                  <div className="field" data-invalid={errors.phone ? "" : undefined}>
                    <label htmlFor="phone">WhatsApp number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+971 50 123 4567"
                      required
                      pattern="^\\+?[0-9\\s\\-]{8,16}$"
                      aria-describedby="phone-error"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                    <span className="error" id="phone-error" aria-live="polite">
                      {errors.phone || ""}
                    </span>
                  </div>

                  <div className="field" data-invalid={errors.city ? "" : undefined}>
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      name="city"
                      required
                      aria-describedby="city-error"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.city ? "true" : "false"}
                    >
                      <option value="">Choose a city</option>
                      <option>Dubai</option>
                      <option>Abu Dhabi</option>
                      <option>Sharjah</option>
                      <option>Ajman</option>
                      <option>Al Ain</option>
                      <option>Ras Al Khaimah</option>
                      <option>Other</option>
                    </select>
                    <span className="error" id="city-error" aria-live="polite">
                      {errors.city || ""}
                    </span>
                  </div>

                  <div className="field">
                    <label htmlFor="treatment">Priority treatment</label>
                    <select
                      id="treatment"
                      name="treatment"
                      value={values.treatment}
                      onChange={handleChange}
                    >
                      <option>Dental implants</option>
                      <option>Veneers</option>
                      <option>Invisalign</option>
                      <option>Braces</option>
                      <option>All-on-4 / All-on-6</option>
                    </select>
                  </div>
                </div>
                <button className="btn btn-primary form-submit" type="submit">
                  Request free audit
                </button>
                <p className="form-note">No spam and no commitment.</p>
              </form>

              <div className="form-success" role="status" tabIndex={-1} id="form-success">
                <span className="stamp">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden="true"
                  >
                    <path d="M2 7.3l3 3L12 3.5" />
                  </svg>
                  Audit requested
                </span>
                <h3>
                  Thanks, <span id="success-name">{firstName}</span>.
                </h3>
                <p>
                  We'll be in touch within 24 hours about the audit for <span id="success-clinic">{values.clinic || "your clinic"}</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 0 }}>
          <div className="container faq">
            <h2 id="faq-title">Before you get started.</h2>
            <div className="faq-list">
              <details open>
                <summary>
                  What counts as a "qualified" lead?
                  <span className="plus" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 0v12M0 6h12" />
                    </svg>
                  </span>
                </summary>
                <p>
                  Someone who has actively enquired about a specific treatment you offer, in a location
                  you serve. Not a random click or a bot form fill.
                </p>
              </details>
              <details>
                <summary>
                  Do I need to pay anything upfront?
                  <span className="plus" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 0v12M0 6h12" />
                    </svg>
                  </span>
                </summary>
                <p>
                  No. We fund the advertising campaigns. You pay only for the qualified leads you receive.
                </p>
              </details>
              <details>
                <summary>
                  Are leads shared with other clinics?
                  <span className="plus" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 0v12M0 6h12" />
                    </svg>
                  </span>
                </summary>
                <p>No. Leads are generated for your clinic and are never resold to competing clinics.</p>
              </details>
              <details>
                <summary>
                  Which treatments can I run campaigns for?
                  <span className="plus" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 0v12M0 6h12" />
                    </svg>
                  </span>
                </summary>
                <p>Dental implants, veneers, Invisalign, braces, and All-on-4 or All-on-6.</p>
              </details>
              <details>
                <summary>
                  Is there a contract or minimum commitment?
                  <span className="plus" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 0v12M0 6h12" />
                    </svg>
                  </span>
                </summary>
                <p>
                  No lock-in contract and no minimum spend. You can pause your campaigns whenever you need
                  to.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section aria-labelledby="final-title">
          <div className="container">
            <div className="final">
              <div>
                <h2 id="final-title">Start getting patient enquiries this month.</h2>
                <p>
                  <strong>From AED 29 per qualified lead.</strong> We take on 6 clinic partnerships per
                  city each month, so slots in busy areas go first.
                </p>
              </div>
              <a className="btn btn-primary" href="#audit">
                Request free audit
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 64 64">
                <path
                  fill="currentColor"
                  d="M19 9c-6 0-11 5-11 12 0 7 4 11 7 16 3 5 2 18 8 18 4 0 4-10 9-10s5 10 9 10c6 0 5-13 8-18 3-5 7-9 7-16 0-7-5-12-11-12-6 0-9 4-13 4s-7-4-13-4z"
                />
              </svg>
            </span>
            Smile Lead Provider
          </a>
          <nav className="footer-links" aria-label="Footer">
            <a href="#how">How it works</a>
            <a href="#treatments">Treatments</a>
            <a href="#faq">FAQ</a>
            <a href="#audit">Free audit</a>
          </nav>
          <p>
            &copy; <span id="year">2026</span> Smile Lead Provider
          </p>
        </div>
      </footer>
    </>
  );
}
