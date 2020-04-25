package fr.omatech.ordernow.web.rest;

import fr.omatech.ordernow.service.FormulaOrderService;
import fr.omatech.ordernow.web.rest.errors.BadRequestAlertException;
import fr.omatech.ordernow.service.dto.FormulaOrderDTO;

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
 * REST controller for managing {@link fr.omatech.ordernow.domain.FormulaOrder}.
 */
@RestController
@RequestMapping("/api")
public class FormulaOrderResource {

    private final Logger log = LoggerFactory.getLogger(FormulaOrderResource.class);

    private static final String ENTITY_NAME = "formulaOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FormulaOrderService formulaOrderService;

    public FormulaOrderResource(FormulaOrderService formulaOrderService) {
        this.formulaOrderService = formulaOrderService;
    }

    /**
     * {@code POST  /formula-orders} : Create a new formulaOrder.
     *
     * @param formulaOrderDTO the formulaOrderDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formulaOrderDTO, or with status {@code 400 (Bad Request)} if the formulaOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/formula-orders")
    public ResponseEntity<FormulaOrderDTO> createFormulaOrder(@RequestBody FormulaOrderDTO formulaOrderDTO) throws URISyntaxException {
        log.debug("REST request to save FormulaOrder : {}", formulaOrderDTO);
        if (formulaOrderDTO.getId() != null) {
            throw new BadRequestAlertException("A new formulaOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormulaOrderDTO result = formulaOrderService.save(formulaOrderDTO);
        return ResponseEntity.created(new URI("/api/formula-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /formula-orders} : Updates an existing formulaOrder.
     *
     * @param formulaOrderDTO the formulaOrderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated formulaOrderDTO,
     * or with status {@code 400 (Bad Request)} if the formulaOrderDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the formulaOrderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/formula-orders")
    public ResponseEntity<FormulaOrderDTO> updateFormulaOrder(@RequestBody FormulaOrderDTO formulaOrderDTO) throws URISyntaxException {
        log.debug("REST request to update FormulaOrder : {}", formulaOrderDTO);
        if (formulaOrderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FormulaOrderDTO result = formulaOrderService.save(formulaOrderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, formulaOrderDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /formula-orders} : get all the formulaOrders.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of formulaOrders in body.
     */
    @GetMapping("/formula-orders")
    public List<FormulaOrderDTO> getAllFormulaOrders(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all FormulaOrders");
        return formulaOrderService.findAll();
    }

    /**
     * {@code GET  /formula-orders/:id} : get the "id" formulaOrder.
     *
     * @param id the id of the formulaOrderDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the formulaOrderDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/formula-orders/{id}")
    public ResponseEntity<FormulaOrderDTO> getFormulaOrder(@PathVariable Long id) {
        log.debug("REST request to get FormulaOrder : {}", id);
        Optional<FormulaOrderDTO> formulaOrderDTO = formulaOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(formulaOrderDTO);
    }

    /**
     * {@code DELETE  /formula-orders/:id} : delete the "id" formulaOrder.
     *
     * @param id the id of the formulaOrderDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/formula-orders/{id}")
    public ResponseEntity<Void> deleteFormulaOrder(@PathVariable Long id) {
        log.debug("REST request to delete FormulaOrder : {}", id);
        formulaOrderService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
