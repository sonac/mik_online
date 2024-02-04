package main

import (
	"encoding/json"
	"log"
	"mik_online/app/pdf"
	"net/http"
	"path/filepath"
)

const pdfDir = "./mik"            // Directory where DJVU files are stored
const staticDir = "./client/dist" // Directory for static files like HTML, JS, CSS

func main() {
	// Serve static files
	http.Handle("/", http.FileServer(http.Dir(staticDir)))
	http.Handle("/public/", contentTypeSetter(http.StripPrefix("/public/", http.FileServer(http.Dir(staticDir)))))
	http.Handle("/api/", http.FileServer(http.Dir(staticDir)))
	http.Handle("/api/healthcheck", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		response := map[string]string{"result": "OK"}
		jsonResponse, _ := json.Marshal(response)
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)
	}))
	http.Handle("/api/dirs", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		dirs, err := pdf.ListDirs(pdfDir)
		if err != nil {
			log.Fatal(err)
		}
		jsonResponse, _ := json.Marshal(dirs)
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)
	}))
	http.Handle("/api/list-files/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		folder := filepath.Base(r.URL.Path[len("/api/list-files/"):])
		log.Println("folder: ", folder)
		folderPath := filepath.Join(pdfDir, folder)
		log.Println("folderPath: ", folderPath)
		files, err := pdf.ListFiles(folderPath)
		if err != nil {
			log.Fatal(err)
		}
		jsonResponse, _ := json.Marshal(files)
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)
	}))
	http.Handle("/api/pdf/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("r.URL.Path: ", r.URL.Path)
		pdfFile := r.URL.Path[8:]
		log.Println("pdfFile: ", pdfFile)
		pdfPath := filepath.Join(pdfDir, pdfFile)
		log.Println("pdfPath: ", pdfPath)
		pdf.ServePDF(w, r, pdfPath)
	}))

	log.Println("Serving on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func contentTypeSetter(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch filepath.Ext(r.URL.Path) {
		case ".js":
			w.Header().Set("Content-Type", "application/javascript")
		case ".css":
			w.Header().Set("Content-Type", "text/css")
		case ".svg":
			w.Header().Set("Content-Type", "image/svg+xml")
		default:
			w.Header().Set("Content-Type", "text/plain")
		}

		next.ServeHTTP(w, r)
	})
}
