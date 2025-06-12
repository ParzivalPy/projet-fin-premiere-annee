#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINE 2048
#define MAX_ID 16
#define MAX_TITLE 256
#define MAX_CONTENT 16384

void trim_newline(char *str) {
    size_t len = strlen(str);
    if (len && (str[len-1] == '\n' || str[len-1] == '\r')) str[len-1] = '\0';
}

int main() {
    FILE *in = fopen("book.txt", "r");
    if (!in) {
        printf("Impossible d'ouvrir book.txt\n");
        return 1;
    }

    char line[MAX_LINE];
    char id[MAX_ID], title[MAX_TITLE];
    char content[MAX_CONTENT];
    int in_chapter = 0;

    while (fgets(line, sizeof(line), in)) {
        if (strncmp(line, "<chapter id=\"", 13) == 0) {
            // Si on était déjà dans un chapitre, on écrit le fichier précédent
            if (in_chapter) {
                char filename[64];
                snprintf(filename, sizeof(filename), "%s.html", id);
                FILE *out = fopen(filename, "w");
                if (out) {
                    fprintf(out, "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n<meta charset=\"UTF-8\">\n<title>%s</title>\n</head>\n<body>\n<h1>%s</h1>\n%s\n</body>\n</html>\n", title, title, content);
                    fclose(out);
                }
                content[0] = '\0';
            }
            // Extraire l'id et le titre
            sscanf(line, "<chapter id=\"%[^\"]\">%[^<]<", id, title);
            in_chapter = 1;
            content[0] = '\0';
        } else if (strncmp(line, "<chapter", 8) == 0) {
            // Ignore, déjà traité
        } else {
            if (in_chapter) {
                strcat(content, line);
            }
        }
    }
    // Dernier chapitre
    if (in_chapter) {
        char filename[64];
        snprintf(filename, sizeof(filename), "%s.html", id);
        FILE *out = fopen(filename, "w");
        if (out) {
            fprintf(out, "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n<meta charset=\"UTF-8\">\n<title>%s</title>\n</head>\n<body>\n<h1>%s</h1>\n%s\n</body>\n</html>\n", title, title, content);
            fclose(out);
        }
    }

    fclose(in);
    printf("Chapitres exportés en HTML.\n");
    return 0;
}