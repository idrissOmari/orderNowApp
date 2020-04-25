package fr.omatech.ordernow.web.rest;

import fr.omatech.ordernow.service.FormulaService;
import fr.omatech.ordernow.web.rest.errors.BadRequestAlertException;
import fr.omatech.ordernow.service.dto.FormulaDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.omatech.ordernow.domain.Formula}.
 */
@RestController
@RequestMapping("/api")
public class FormulaResource {

    private final Logger log = LoggerFactory.getLogger(FormulaResource.class);

    private static final String ENTITY_NAME = "formula";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FormulaService formulaService;

    public FormulaResource(FormulaService formulaService) {
        this.formulaService = formulaService;
    }

    /**
     * {@code POST  /formulas} : Create a new formula.
     *
     * @param formulaDTO the formulaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formulaDTO, or with status {@code 400 (Bad Request)} if the formula has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/formulas")
    public ResponseEntity<FormulaDTO> createFormula(@RequestBody FormulaDTO formulaDTO) throws URISyntaxException {
        log.debug("REST request to save Formula : {}", formulaDTO);
        if (formulaDTO.getId() != null) {
            throw new BadRequestAlertException("A new formula cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormulaDTO result = formulaService.save(formulaDTO);
        return ResponseEntity.created(new URI("/api/formulas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /formulas} : Updates an existing formula.
     *
     * @param formulaDTO the formulaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated formulaDTO,
     * or with status {@code 400 (Bad Request)} if the formulaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the formulaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/formulas")
    public ResponseEntity<FormulaDTO> updateFormula(@RequestBody FormulaDTO formulaDTO) throws URISyntaxException {
        log.debug("REST request to update Formula : {}", formulaDTO);
        if (formulaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FormulaDTO result = formulaService.save(formulaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, formulaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /formulas} : get all the formulas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of formulas in body.
     */
    @GetMapping("/formulas")
    public List<FormulaDTO> getAllFormulas() {
        log.debug("REST request to get all Formulas");
        return formulaService.findAll();
    }

    /**
     * {@code GET  /formulas/:id} : get the "id" formula.
     *
     * @param id the id of the formulaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the formulaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/formulas/{id}")
    public ResponseEntity<FormulaDTO> getFormula(@PathVariable Long id) {
        log.debug("REST request to get Formula : {}", id);
        Optional<FormulaDTO> formulaDTO = formulaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(formulaDTO);
    }

    /**
     * {@code DELETE  /formulas/:id} : delete the "id" formula.
     *
     * @param id the id of the formulaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/formulas/{id}")
    public ResponseEntity<Void> deleteFormula(@PathVariable Long id) {
        log.debug("REST request to delete Formula : {}", id);
        formulaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
