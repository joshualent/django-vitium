import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Alpine from "alpinejs";
import htmx from "htmx.org";

// Initialize Alpine.js
declare global {
  interface Window {
    Alpine: any;
    htmx: any;
  }
}

window.Alpine = Alpine;
Alpine.start();

// Initialize HTMX
window.htmx = htmx;
